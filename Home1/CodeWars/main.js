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

//Number1 веруть массив числа x в квадрате от 1 до n, если n < 1 вернуть []
/*const squares = (x, n) => {
  let myArr = [];
  for(let i=1; i<=n;i++){
    i
    
  }
  return myArr
}
 
 console.log(squares(2, 5))*/



//Number3 отфильтровать число
const FilterString = (value) => Number(value.split("").filter(el => !isNaN(el)).join(""));

//console.log(typeof FilterString("1abc2abc3"))
//Array 1 общие элнменты
const arr1 = [1, 2, 3, "a"];
const arr2 = [1, 2, 4, "a", "b"]


function inter(s1, s2) {
  let result = [];
  s1.forEach(el => {
    if(s2.indexOf(el) !== -1){
      result.push(el);
    }
  });
  return result;
}
//console.log(inter(arr1, arr2))


//Array2
const divCon = (x) => {
  let sum1 = 0;
  let sum2 = 0;
  x.forEach((el) =>{
    if(typeof el !== "number"){
      sum2 += parseInt(el);
    }
    else{
      sum1 += el;
    }
})
      return sum1 - sum2;
}

//console.log(divCon([9, 3, '7', '3']));

//Array3 найти число в массиве которое встречается нечетное кол-во раз!!
 const arrNum = [20,1,-1,2,-2,3,3,5,5,1,2,4,20,4,-1,-2,5] // ответ 5! 
 
 const findOdd = (arr) => {
   let obj ={};
   let count = 0;
   let val;
   arr.forEach(el =>{ 
     !obj.hasOwnProperty(el) ? obj[el] = arr.filter(item => item === el).length : false;
   });
   return parseIntObject.keys(obj).find(key => obj[key] === Object.values(obj).find(el => !Number.isInteger(parseInt(el) / 2)));
 }
 

//console.log(findOdd(arrNum))

//Array4 вернуть четное или не четное ед числр из массива
//const array = ([0, 1, 2]) //retur 1
const array = ([1, 2, 3]) //return 2

const findOutlier = (integers) => {
  let arrInt = integers.filter(el => Number.isInteger(el/2));
  let arrNoInt = integers.filter(el => !Number.isInteger(el/2))
  
  return arrInt.length > arrNoInt.length ? parseInt(arrNoInt.join("")) : parseInt(arrInt.join(""));
}
/*function findOutlier(int) {
  var even = int.filter(a => a % 2 == 0);
  var odd = int.filter(a => a % 2 !== 0);
  return even.length == 1 ? even[0] : odd[0];
}*/

//console.log(findOutlier(array));



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
  console.log(Object.keys(obj))
  return obj;
}

//Object2 killer search 

const obj =   {'James': ['Jacob', 'Bill', 'Lucas'], 'Johnny': ['David', 'Kyle', 'Lucas'], 'Peter': ['Lucy', 'Kyle']}
const arr =   ['Lucas', 'Bill'];

function killer(suspectInfo, dead) {
  return Object.keys(suspectInfo).reduce((acc, el) => {
    let a = 0;
    suspectInfo[el].forEach(e => {
      if (dead.indexOf(e) !== -1) {
        a++;
      }
    })
    if (a === dead.length) acc += el;
    return acc
  }, "")
}
//console.log(killer(obj, arr));
