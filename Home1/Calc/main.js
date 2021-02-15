'use strict'
window.addEventListener('DOMContentLoaded', function() {
    const lcd = document.querySelector('.lcd');
    const message = document.querySelector('.message'); //для деления на "0"!!
    const btn = document.querySelector('.keypad');
    const op = ["+", "-", "*", "/"];
    let str = '';
    btn.addEventListener('click', function(e) {
        if (e.target.value !== '=') {
            if (e.target.classList.contains('op')) {
                //замена знака операции на новый при нажатии
                op.forEach(el => {
                    el === str[str.length - 1] ? str = str.slice(0, -1) : false;
                });
            }
            str += e.target.value;
            lcd.innerHTML = str;
        }
        if (e.target.classList.contains('reset')) {
            str = "";
            lcd.innerHTML = str;
        }
        if (e.target.classList.contains('del')) {
            str = str.substr(0, str.length - 1);
            lcd.innerHTML = str;
        }
        if (e.target.classList.contains('equals')) {
            str = str.split(/\b/); //разбиваем строку на символы и числа
            searchDot(str);
            if (str.length < 3) {
                str = str.join("")
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
/*let e = '2.2+4/2';
e = e.split(/\b/);
console.log(e)str.map((el, i) => {
  let replaceEl;
  el === "." ? replaceEl = str.splice(i - 1, 3, (str[i - 1] + str[i] + str[i + 1])) : false;
});
for (let i = 0; i < e.length; i++) {
  if (e[i] === ".") {
    let  replaceEl = e.splice(i - 1, 3, (e[i - 1] + e[i] + e[i + 1]));
  }
}
console.log(e)*/