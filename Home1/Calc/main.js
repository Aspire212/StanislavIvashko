'use strict'
window.addEventListener('DOMContentLoaded', function() {
    const lcd = document.querySelector('.lcd');
    const message = document.querySelector('.message'); //для деления на "0"!!
    const btn = document.querySelector('.keypad');
    const sign = ["+", "-", "*", "/", "="];
    let str = '0';
    lcd.innerHTML = str;
    let counter = 0; //счетчик для кликов

    btn.addEventListener('click', function(e) {
        counter++
        if (counter === 1 && !isNaN(e.target.value)) {
            str = str.slice(0, -1);
        }
        if (e.target.value !== '=') {
            if (e.target.classList.contains('op')) {
                //замена знака операции на новый при нажатии
                sign.forEach(el => {
                    el === str[str.length - 1] ? str = str.slice(0, -1) : false;
                });
            }

            if (!e.target.classList.contains('keypad')) {
                str += e.target.value;
                lcd.innerHTML = str;
            }

        }
        if (e.target.classList.contains('reset')) {
            str = "0";
            counter = 0;
            lcd.innerHTML = str;
        } // потанцевать с бубном
        if (e.target.classList.contains('del')) {
            if (str.length !== 0) {
                str = str.substr(0, str.length - 1);
                lcd.innerHTML = str;
            } else {
                str = "0";
                counter = 0;
            }
        }
        if (e.target.classList.contains('equals')) {
            str = str.split(/\b/); //разбиваем строку на символы и числа
            searchDot(str);
            if (str.length < 3) {
                str = str.join("");
                lcd.innerHTML = str;
            } else {
                calculated(str);
            }
            lcd.innerHTML = str.join("");
        }
    });
    //поиск точек в массиве и склеивание в одно число
    function searchDot(arr) {
        str.map((el, i) => {
            let replaceEl;
            el === "." ? replaceEl = arr.splice(i - 1, 3, (arr[i - 1] + arr[i] + arr[i + 1])) : false;
        });
    }
    //калькулятор
    function calculated(arr) {
        operation(arr, "/", "*"); //сразу "* и /"
        operation(arr, "-", "+"); //после "- и +"
    }
    //математическая логика для правильной последовательности операций
    function operation(arr, op1, op2 = op1) {
        arr.forEach(el => (el !== op1 || el !== op2) ? mathLogic(arr, op1, op2) : false);
    }
    //замена 3-х подряд идущих знаков в массиве на их решение
    function mathLogic(arr, op1, op2 = op1) {
        if (arr.length < 3) {
            return arr.join("");
        }
        let replaceEl;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === op1 || arr[i] === op2) {
                replaceEl = arr.splice(i - 1, 3, equals(arr[i - 1], arr[i], arr[i + 1]));
            }
        }
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
            return newNum = (parseFloat(num1) / parseFloat(num2)).toFixed(4);
        }
    }
});

// убрать возможность клика между кнопок