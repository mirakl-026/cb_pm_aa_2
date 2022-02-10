// Коллбэки
// в примере выше - функция внутри setTimeout запускается после всего в 
// главном контексте, но, если мы всё таки хотим вывести 1,2,3 - тогда 
// прибегаем к концепции коллбэков (функции обратного вызова):

// пример:

// // просто функция
// function fn () {
//     console.log("just a function");
// }

// // функция с коллбэком
// function higherOrderFunction(callback) {
//     // если аргумент вызывается как функция - это называется функция обратного вызова
//     callback();
// }

// higherOrderFunction(fn);

// теперь возвращаемся к fisrt и т.д. и воспользуемся концепцией
function first() {
    console.log(1);
}

function second(callback) {
    setTimeout(() => {
        console.log(2);

        callback(); // запускаем функцию обратного вызова - тем самым гарантируем её вызов точно после асинхронной операции
    }, 0);
}

function third() {
    console.log(3);
}

first();
second(third);
// 1
// 2
// 3 - всё супер, но есть проблема - callbackHell