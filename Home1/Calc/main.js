'use strict'
window.addEventListener('DOMContentLoaded', function() {
    const lcd = document.querySelector('.lcd');
    const message = document.querySelector('.message'); //для деления на "0"!!
    const btn = document.querySelector('.keypad');
    const dot = document.querySelector('.dot');
    const sign = ["+", "-", "*", "/", "=", "&divide;", "&times;", "."];
    let str = '0';
    lcd.innerHTML = str;
    let counter = 0; //счетчик для кликов

    //СОБЫТИЯ
    btn.addEventListener('click', calc);

    //ФУНКЦИИ
    function calc(e) {
        let eValue = e.target.value;
        let eClass = e.target.classList;
        //если после вычисления нажать на знак или цифру
        if (counter === 0 && str !== '0' && !eClass.contains('pm')) {
            sign.forEach(el => {
                eValue !== el ? str = eValue : str = '0' + eValue;
            });
        }
        counter++;
        //замена 0 на другую цифру
        if (counter === 1 && !isNaN(eValue) && !eClass.contains('pm') && !eClass.contains('equals')) {
            if (eValue === "0") {
                counter = 0;
            }
            str = str.slice(0, -1);
        }
        if (eValue !== sign[4]) {
            if (eClass.contains('op')) {
                //возвращаю значение точке после клика на знаки операций
                dot.value = sign[7];
                //замена знака операции на новый при нажатии
                sign.forEach(el => {
                    el === str[str.length - 1] ? str = str.slice(0, -1) : false;
                });
            }
            if (!eClass.contains('keypad')) {
                if (eValue === sign[7]) {
                    if (!isNaN(str[str.length - 2])) {
                        str += "0";
                    }
                }
                str += eValue;
                //замена знакоа на стороне пользователя
                lcd.innerHTML = str.replace(sign[3], sign[5]).replace(sign[2], sign[6]);
            }
        }
        //сбросс
        if (eClass.contains('reset')) {
            str = "0";
            counter = 0;
            lcd.innerHTML = str;
        }
        //ноль процентов !true
        if (eClass.contains('percnt') && str === '0%') {
            console.log(str)
            str = "0";
            counter = 0;
            lcd.innerHTML = str;
        }
        //унарный минус
        if (eClass.contains('pm')) {
            str = str.split(/\b/);
            if (str.length < 2) {
                searchDot(str, sign[7]);
                str = sign[1] + str;
            } else if (str[0] === sign[1]) {
                str.shift();
            }
            if (str === '0') {
                counter = 0;
            }
            lcd.innerHTML = str;
        }
        //запрет нескольких точек в одном числе, по клику на точку забираю значение
        if (eValue === sign[7]) {
            dot.value = '';
        }

        //стирание последнего символа
        if (eClass.contains('del')) {
            if (str.length > 1) {
                str = str.substr(0, str.length - 1);
                lcd.innerHTML = str;
            } else {
                str = "0";
                counter = 0;
                lcd.innerHTML = str;
            }
        }
        if (eClass.contains('equals')) {
            //разбиваем строку по сиимволам
            str = str.split(/\b/);
            //если первый символ выражения "-"
            if (str[0] === sign[1]) {
                str.unshift(0);
            }

            searchDot(str, sign[7]);
            searchPrc(str, '%');
            zeros(str, sign[3]);
            if (str.length < 3) {
                //str = str.join("");
                lcd.innerHTML = str;
            } else {
                calculated(str);
            }
            counter = 0;
            //str = str.join("");
            lcd.innerHTML = str;
        }
    }

    function zeros(arr, sym) {
        //деление на ноль
        arr.forEach((el, i) => {
            if (el === sym && (arr[i + 1] === '0' || arr[i + 1] === '0' && arr[i + 2] === '%')) {
                arr = '0';
                lcd.innerHTML = arr;
                counter = 0;
                message.innerHTML = "На ноль делить нельзя!";
                setTimeout(() => {
                    message.innerHTML = "";
                    lcd.innerHTML = arr;
                }, 3000);
            }
        });
    }
    //поиск точек в массиве и склеивание в одно число
    function searchDot(arr, sym) {
        arr.map((el, i) => {
            let concatEl;
            el === sym ? concatEl = arr.splice(i - 1, 3, (arr[i - 1] + arr[i] + arr[i + 1])) : false;
        });
    }
    //поиск и решение процентов
    function searchPrc(arr, sym) {
        arr.map((el, i) => {
            let transformEl;
            if (el === sym) {
                let b = (arr[i - 2] === sign[0] || arr[i - 2] === sign[1]) ? arr[i - 3] : 1;
                transformEl = arr.splice(i - 1, 2, (parseFloat(b) / 100 * parseFloat(arr[i - 1])).toFixed(3));
            }
        });
    }
    //калькулятор
    function calculated(arr) {
        operation(arr, sign[3], sign[2], message); //сразу "* и /"
        operation(arr, sign[1], sign[0]); //после "- и +"
    }
    //математическая логика для правильной последовательности операций
    function operation(arr, op1, op2 = op1) {
        arr.forEach(el => (el !== op1 || el !== op2) ? mathLogic(arr, op1, op2) : false);
    }
    //замена 3-х подряд идущих знаков в массиве на их решение
    function mathLogic(arr, op1, op2 = op1) {
        if (arr.length < 2) {
            return arr.join("");
        }
        let replaceEl;
        arr.forEach((el, i) => {
            if (arr[i] === op1 || arr[i] === op2) {
                replaceEl = arr.splice(i - 1, 3, equals(arr[i - 1], arr[i], arr[i + 1]));
            }
        })
    }
    //решение выражения
    function equals(num1, op, num2) {
        let newNum;
        if (op === '+') {
            return newNum = parseFloat(num1) + parseFloat(num2);
        }
        if (op === '-') {
            return newNum = parseFloat(num1) - parseFloat(num2);
        }
        if (op === '*') {
            return newNum = parseFloat(num1) * parseFloat(num2);
        }
        if (op === '/') {
            newNum = (parseFloat(num1) / parseFloat(num2));
            if (newNum === Infinity) {
                return newNum = 0;
            } else {
                return newNum === Math.floor(newNum) ?
                    Math.floor(newNum) : newNum.toFixed(3);
            }
        }
    }
});
//оптимизировать
// сделать везде tofixed(3)

/*  document.addEventListener('keydown', function(e) {
        let eKey = e.key;
        console.log(eKey)

        //str += eKey;
        lcd.innerHTML = str;

        if (eKey === 'Enter') {}

    });
 */