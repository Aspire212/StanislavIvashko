'use strict'
let reg = '2 * (-3.2 + 1) + (4 - 2)'; //=> -4.4

function calc(str) {
  
  str = [str]
  str.forEach((el, i) => {
    if ( el === "(") {
      
    }
    
    
  })
    //str = str.split("").filter(el => el !==" ");
    
    /*if(str.includes(".")) {
      str.map((el, i) => {
        el === "." ? el = str.splice(i - 1, 3, (str[i - 1] + str[i] + str[i + 1])) : false;
      });
    }*/
    
    return str//.indexOf("\(")
}
console.log(calc(reg))



/*
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
            el === sym ? el = arr.splice(i - 1, 3, (arr[i - 1] + arr[i] + arr[i + 1])) : false;
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
*/