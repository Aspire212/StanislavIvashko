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

const isIsogram = (str) => {
    let result = [];
    str = str.toLowerCase().split("");
    for(let el of str ){
      if(!result.includes(el)){
        result.push(el)
      }
    }
    return result.length === str.length;
}

//console.log(isIsogram("daAfse"))

//String 5 преобразование в сharCodeAt()

const calc = (x) => {
  let total1 = x.split("").map(el => el= el.charCodeAt()).join("");
  let total2 = [...total1].map(el => el === "7" ? el = "1" : el).reduce((sum, el) => parseInt(sum) + parseInt(el));
  total1 = total1.split("").reduce((sum, el) => parseInt(sum) + parseInt(el));
  return total1 - total2;
}
// console.log(canlc("ABC"))



//Object1 подсчет уникальных элементов и закидывпние их в объкт гд значенин это кол-во плвторяющихся элементов;

const  count = (array) => {
  const obj={};
  for(let el of array){
    if(!obj.hasOwnProperty(el)){
      obj[el] = 0;
    }
  }
  for(let el in obj){
    obj[el] = array.filter(item => item === el).length;
  }
  return obj;
}
//console.log(count(["\\ '15 \\'", "\ '\'", "a", true, "b", "b" ]))
console.log(count(['a', 'b', 'b', 'a', 'b']))
//Ожидается: '{\ '15 \': 1, \ '\': 1, a: 1, true: 1, b: 2} ', вместо этого получено:' {\ '15 \ ': 0, \' \ ' : 1, a: 1, истина: 0, b: 2} '

//Object2 killer search 

function killer(suspectInfo, dead) {
  
    dead.forEach(name => {
      for(let el in suspectInfo){
      suspectInfo[el] = suspectInfo[el].filter(el => el !== name);
      console.log(el)
    }
  })
  return suspectInfo
}
console.log(killer(
  {'James': ['Jacob', 'Bill', 'Lucas'], 'Johnny': ['David', 'Kyle', 'Lucas'], 'Peter': ['Lucy', 'Kyle']},
  
  ['Lucas', 'Bill']));

//killer({'James': ['Jacob', 'Bill', 'Lucas']},  {'Johnny' : ['David', 'Kyle', 'Lucas']},

console.log([1, 2, 2, 3].filter(el => el == 2))