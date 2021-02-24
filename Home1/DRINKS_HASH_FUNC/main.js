'use strict'
const addName = document.querySelector('#addName');
const alcohol = document.querySelector('#alcoholic');
const recipe = document.querySelector('#recipe');
const searchName = document.querySelector('#searchName');
const list = document.querySelector('.list');
const searchRecipe = document.querySelector('.searchRecipe');
const deleteName = document.querySelector('#deleteName');
const message = document.querySelector('.message');


function clearForm() {
    addName.value = "";
    alcohol.value = "Нет";
    recipe.value = "";
}
class HashStorageFunc {
    constructor() {}
    addValue(key, value) {
        return this[key] = value;
    }
    getValue(key) {
        return this[key];
    }
    deleteValue(key) {
        return delete this[key];
    }
    getKeys() {
        return Object.keys(this);
    }
}

const drinkStorage = new HashStorageFunc();

addItem.onclick = () => {
    if (addName.value !== "") {
        const valobj = {
            'Алкогольный': alcohol.value,
            'Рецепт приготовления': recipe.value,
        }
        drinkStorage.addValue(addName.value, valobj);
        clearForm();
        console.log(drinkStorage)
    } else {
        clearForm();
        addName.placeholder = "Поле не может быть пустым";
    }
}

searchList.onclick = () => {
    if (drinkStorage.hasOwnProperty(searchName.value)) {
        searchRecipe.innerHTML = "";
        for (let key in drinkStorage.getValue(searchName.value)) {
            let li = document.createElement('li');
            li.innerHTML = `${key} : ${drinkStorage.getValue(searchName.value)[key]} `;
            searchRecipe.append(li);
        }
    } else {
        searchRecipe.innerHTML = undefined;
    }
    searchName.value = '';
}

listItem.onclick = () => {
    if (drinkStorage.getKeys().length < 1) {
        list.innerHTML = 'В каталоге нет рецептов!'
    } else {
        list.innerHTML = "";
        drinkStorage.getKeys().forEach(el => {
            let li = document.createElement('li');
            li.innerHTML = el;
            list.append(li);
        });
    }
}

deleteItem.onclick = () => {
    if (!drinkStorage.hasOwnProperty(deleteName.value)) {
        deleteName.value = '';
        message.innerHTML = false;
    } else {
        drinkStorage.deleteValue(deleteName.value);
        deleteName.value = '';
        message.innerHTML = true;
    }
}