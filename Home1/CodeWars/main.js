'use strict'
//String 1 удаление гласных букв!
  
let disemvowel = (str) => str.replace(/[aeiouAEIOU]/g, "");

//console.log(disemvowel("This website is for losers LOL!"));

//String 2 1ый заглавный, 1 эл 1 , 2эл 2....
//переделатб в один map
let accum = (s) => s.split("").map((el, i) => el = el.toUpperCase() + el.repeat(i).toLowerCase()).join("-");


console.log(accum('abcd'));