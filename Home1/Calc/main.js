window.addEventListener('DOMContentLoaded', function() {
  const lcd = document.querySelector('.lcd');
  const message = document.querySelector('.message')
  const btn = document.querySelector('.keypad');
  let arr = ''
  btn.addEventListener('click', function(e) {
    if (e.target.value !== '=' && e.target.classList !== 'op') {
      arr += e.target.value;
      lcd.innerHTML = arr;
    }

    if (e.target.classList.contains('reset')) {
      arr = "";
      lcd.innerHTML = arr;
    }
    if (e.target.classList.contains('del')) {
      arr = arr.substr(0, arr.length - 1);
      lcd.innerHTML = arr;
    }
    
    if (e.target.classList.contains('equals')) {
      arr = arr.split(/\b/);
      arr.forEach((el, i) => {
        if(el === "/" && arr[i+1] === "0"){
          console.log('на 0 делить нельзя')
        }  
        else{
          calculated(arr);
        }
      })
      lcd.innerHTML = arr.join("");
    }
  });

  function calculated(arr) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] !== "/" || arr[i] !== "*") {
        mathLogic(arr, "/", "*");
      }
    }
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] !== "-") {
        mathLogic(arr, "-", "+");
      }
    }

    function mathLogic(arr, op1, op2 = op1) {
      if (arr.length < 3) {
        return arr.join("")
      }
      let replaceEl;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] === op1 || arr[i] === op2 ) {
          replaceEl = arr.splice(i - 1, 3, equals(arr[i - 1], arr[i], arr[i + 1]))
        }
      }
    }
    function equals(a, op, b) {
      if (op === '+') {
        return str = parseInt(a) + parseInt(b);
      }
      if (op === '-') {
        return str = parseInt(a) - parseInt(b);
      }
      if (op === '*') {
        return str = parseInt(a) * parseInt(b);
      }
      if (op === '/') {
        return str = (parseInt(a) / parseInt(b)).toFixed();
      }
    }
    console.log(arr);
    return arr;
  }
});

console.log('22+5/1'.split(/\b/))