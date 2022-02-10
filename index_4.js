// Промис (ES6) представляет собой результат выполнения асинхронной функции - 
// это объект, который может вернуть значение в будущем.

// По большому счёту, промисы выполняют схожую задачу с коллбэками, но более читабильны
// для людей и имеют расширенный функцинал

// создание промиса:
// const prom1 = new Promise( (resolve, reject) => {} );

// console.log(prom1);  // Promise { <pending> }    // будет ждать вечно, так как нет resolve и reject

// объекта промиса имеет два массива: 
// [[PromiseStatus]]: - статус промиса 
// [[PromiseValue]]: - значение

// статусы промисов:
// Pending - Initial state before being resolved or rejected 
// Fulfilled - Successful operation, promise has resolved
// Rejected - Failed operation, promise has rejected

// сам промис принимает аргументом функцию, имеющую 2 аргумента - resolve и reject
// сами аргументы - тоже функции, которые обрабатывают успех и ошибку:

// const prom2 = new Promise ((resolve, reject) => {
//     resolve("we did it!");
// })

// console.log(prom2);     // Promise { 'we did it!' }
// [[PromiseStatus]]: "fulfilled"
// [[PromiseValue]]: "We did it!"

// для доступа к полученному значению у объекта промиса есть метод then, 
// который запустится сразу после resolve, then вернёт значение промиса как параметр:
// prom2.then((resultValue) => {
//     console.log(resultValue);
// })

// зная, что then точно запустится после resolve (так-же как catch после reject)
// мы можем упростить работу с асинхронными функциями:

function first() {
    console.log(1);
}

function second(callback) {
    setTimeout(() => {
        let data = 2;
        console.log(data);
        callback(data); // запускаем функцию обратного вызова - тем самым гарантируем её вызов точно после асинхронной операции
    }, 0);
}

function third() {
    console.log(3);
}

// first();
// second(third);

// на промисах:

const promise2 = new Promise((resolve, reject) => {
    // const icallback = function (dataValue) {
    //     resolve(dataValue);
    // }
    // second(icallback);

    second((dataValue) => resolve(dataValue));
})

first();
promise2.then((value) => {
    third();
    console.log("asquired value: ", value);
});