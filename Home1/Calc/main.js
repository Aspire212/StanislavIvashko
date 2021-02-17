'use strict'
window.addEventListener('DOMContentLoaded', function() {
    const lcd = document.querySelector('.lcd');
    const message = document.querySelector('.message'); //для деления на "0"!!
    const btn = document.querySelector('.keypad');
    const sign = ["+", "-", "*", "/", "=", "&divide;", "&times;", "."];
    let str = '0';
    lcd.innerHTML = str;
    let counter = 0; //счетчик для кликов
    btn.addEventListener('click', function(e) {
        counter++;
        //замена 0 на другую цифру
        if (counter === 1 && !isNaN(e.target.value) && !e.target.classList.contains('pm')) {
            if (e.target.value === "0") {
                counter = 0;
            }
            str = str.slice(0, -1);
        }
        if (e.target.value !== '=') {
            if (e.target.classList.contains('op')) {
                //замена знака операции на новый при нажатии         (arr[i-3] ? arr[i-3] : 100);

                sign.forEach(el => {
                    el === str[str.length - 1] ? str = str.slice(0, -1) : false;
                });
            }
            if (!e.target.classList.contains('keypad')) {
              if(e.target.value === sign[7]){
                if(!isNaN(str[str.length-2])){
                  str += "0";
                }
              }
                str += e.target.value;
                //замена знакоа на стороне пользователя 
                lcd.innerHTML = str.replace(sign[3], sign[5]).replace(sign[2], sign[6]);
            }
        }
        //сбросс
        if (e.target.classList.contains('reset')) {
            str = "0";
            counter = 0;
            lcd.innerHTML = str;
        }
        //ноль процентов !true
        if(e.target.classList.contains('percnt') && str === '0' + e.target.value){
          console.log(str)
          str = "0";
          counter = 0;
          lcd.innerHTML = str;
        }
        //унарный минус
        if(e.target.classList.contains('pm')){
          if(str.length === 1 && str !== '0'){
            str = str.split(/\b/);
            searchDot(str, sign[7]);
            str = sign[1] + str;
          }
          else if(str[0] === sign[1]){
            str = str.substr(1, str.length-1);
          }
          if(str === '0'){
            counter = 0;
          }
          lcd.innerHTML = str;
        }
        //стирание последнего символа
        if (e.target.classList.contains('del')) {
            if (str.length > 1) {
                str = str.substr(0, str.length - 1);
                lcd.innerHTML = str;
            } else {
                str = "0";
                counter = 0;
                lcd.innerHTML = str;
            }
        }
        if (e.target.classList.contains('equals')) {
            //разбиваем строку по сиимволам
            str = str.split(/\b/);
            //если первый символ выражения "-"
            if (str[0] === sign[1]) {
              str.unshift(0);
            }
            searchDot(str, sign[7]);
            searchPrc(str, '%');
            //деление на ноль
            str.forEach((el, i) => {
                if (el === sign[3] && str[i + 1] == '0') {
                    str = "0";
                    counter = 0;
                    message.innerHTML = "На ноль делить нельзя!";
                    setTimeout(() => {
                        message.innerHTML = "";
                        lcd.innerHTML = str;
                    }, 3000);
                }
            });
            
            if (str.length < 3) {
                str = str.join("");
                lcd.innerHTML = str;
            } else {
                calculated(str);
            }
            counter = 0;
            str = str.join("");
            lcd.innerHTML = str;
            //str="0"//если строка не число соunter 1, если чимло str0 counter0
        }
    });
    
    
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
        if(el === sym){
          let b = arr[i-3] ? parseFloat(arr[i-3]) : 1;
         transformEl = arr.splice(i-1, 2, (parseFloat(b)/ 100 * parseFloat(arr[i-1])).toFixed(3));
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
        if (arr.length < 3) {
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
           return newNum === Math.floor(newNum) ?
            Math.floor(newNum) : newNum;
        }
    }
});
//оптимизировать
//добавить функцию %
//запретить ставить несколько точек в одном числе
//деление на 0
// в equals доделать концовку

//заменить е.target.value и e.target.classlist на переменные

// перебелать безымянную ф-цию в листенере в именную
 // сделать везде tofixed(3)
 