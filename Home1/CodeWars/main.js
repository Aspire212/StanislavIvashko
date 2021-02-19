'use strict'
//String 1 удаление гласных букв!
  
let disemvowel = (str) => str.replace(/[aeiouAEIOU]/g, "");

//console.log(disemvowel("This website is for losers LOL!"));

//String 2 1ый заглавный, 1 эл 1 , 2эл 2....
//переделатб в один map
let accum = (s) => s.split("").map((el, i) => el = el.toUpperCase() + el.repeat(i).toLowerCase()).join("-");


//console.log(accum('abcd'));

//String 3 самый большой и самый маленькиц
const highAndLow = (numbers) => numbers.split(" ").sort((a, b) => b - a).map((el, i) => i === 0 || i === numbers.split(" ").length-1 ? parseInt(el) : "" ).filter(el => el !== "").map(el => numbers.split(" ").length === 1 ? `${el} ${el}`: el).join(" ");
  
//console.log(highAndLow("4 5 29 54 4 0 -214 542 -64 1 -3 6 -6"))

//console.log(highAndLow("42"))
//`${Math.max(...numbers) через спред


//String4 повторяющиеся буквы


console.log(isogram([1, 2, [4, 3], 6]))