'use strict'
let reg = "2+2+(3+1+(2-1*(5)))"
const sign = ["+", "-", "*", "/", "=", "&divide;", "&times;", "."];
   reg = reg.split("").filter(el => el !==" ").join("");

console.log(reg)
//функция чтобы добраться до самых глубоких скоок
function brekit(str){
  let myStr = str;
  let sub = str;
  if(!sub.substr(1).includes("(")){
    let newStr = sub.slice(1, sub.indexOf(")"));
    let oldStr = sub.slice(0, sub.indexOf(")") + 1);
   return reg.replace(oldStr, calculated(newStr));
  }
  else{
    return brekit(sub.substr(1));
  }
}
reg = brekit(reg)
reg = brekit(reg)





function repl(str) {
   if(!str.includes("(")){
     return str 
   }
   else{
     str = brekit(reg)
     return repl(str.substr(1))
    
    }
    
    
    //вставить все функцми
    
    
}
repl(reg)

    //калькулятор
    function calculated(arr) {
      console.log(arr)
      arr = arr.split("");
      arr.map((el, i) => isNaN(el) || arr[i+1] === "-" ? el = arr.splice(i + 1, 2, ('+', arr[i+1] + arr[i + 2])) : el)
      arr.includes(".") && searchDot(arr, sign[7])
      operation(arr, sign[3], sign[2]); //сразу "* и /"
      operation(arr, sign[1], sign[0]); //после "- и +"
      return arr.join("")

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
    function searchDot(arr, sym) {
      arr.map((el, i) => {
        el === sym ? el = arr.splice(i - 1, 3, (arr[i - 1] + arr[i] + arr[i + 1])) : false;
      });
    }
    //решение выражения
    function equals(num1, op, num2) {
      if(num2 === "(") return num2
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
          return newNum === Math.floor(newNum) ? Math.floor(newNum) : newNum.toFixed(3);
        }
      }
    }
/*console.log(calculated(reg))*/