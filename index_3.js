// вложенные коллбэчные - 
// Pyramid of Doom или Callback Hell

// пример вложенных коллбэков:
// function PyramidOfDoom() {
//     setTimeout(() => {
//         console.log(1);
//         setTimeout(() => {
//             console.log(2);
//             setTimeout(() => {
//                 console.log(3);
//             }, 500);
//         }, 2000);
//     }, 1000);
// }

// PyramidOfDoom();

// 1
// 2 
// 3
// это конечно да, но в реальности может быть очень много разных ассинхронных 
// функций обязанных запускаться друг за другом

// пример

// пример асинхронной функции - запроса
function asynchronousRequest (args, callback) {
    // выбрасываем исключение, если параметров нет
    if(!args) {
        return callback(new Error("smth goes wrong..."));
    } else {
        return setTimeout( () => {
            return callback(null, {body: args + ' ' + Math.floor(Math.random() * 10)})
        }, 500);
    }
}

// вложенные запросы:
function callbackHell () {
    asynchronousRequest("1First", function first(error, response) {
        if (error) {
            console.log(error);
            return;
        }
        console.log(response.body);
        asynchronousRequest("1Second", function second(error, response) {
            if (error) {
                console.log(error);
                return;
            } 
            console.log(response.body);
            asynchronousRequest("1Third", function third(error, response) {
                if (error) {
                    console.log(error);
                    return;
                }
                console.log(response.body);
            })
        })
    })

    // asynchronousRequest("2First", function first(error, response) {
    //     if (error) {
    //         console.log(error);
    //         return;
    //     }
    //     console.log(response.body);
    //     asynchronousRequest("2Second", function second(error, response) {
    //         if (error) {
    //             console.log(error);
    //             return;
    //         } 
    //         console.log(response.body);
    //         asynchronousRequest("2Third", function third(error, response) {
    //             if (error) {
    //                 console.log(error);
    //                 return;
    //             }
    //             console.log(response.body);
    //         })
    //     })
    // })
}

// выполняем
callbackHell();

// если как есть:
// 1First 5
// 1Second 8
// 1Third 3

// если всё - 
// вывод такой:
// 1First 2
// 2First 8
// 1Second 9
// 2Second 5
// 1Third 3
// 2Third 2


// и короче придумали промисы