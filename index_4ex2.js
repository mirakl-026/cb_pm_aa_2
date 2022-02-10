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

// оборачиваем функцию с коллбэком в промис:
function promiseHeaven (args) {
    return new Promise((resolve, reject) => {

        const callback = function(error, response) {
            if (error) {
                // console.log(error);
                reject(error);
            }
            // console.log(response.body);
            resolve(response);
        }

        asynchronousRequest(args, callback);
    });
}

// promiseHeaven("1First").then(() => {
//     promiseHeaven("1Second").then(() =>{
//         promiseHeaven("1Third").then(() => {
//
//          });
//     });
// });


// promiseHeaven()
//     .then(result => console.log("promise result: ", result))
//     .catch(reason => console.log("problem: ", reason))   // <-

// promiseHeaven("1First")
//     .then(result => console.log("promise result: ", result)) // <-
//     .catch(reason => console.log("problem: ", reason))   

async function main () {
    const res1 = await promiseHeaven("1First");
    const res2 = await promiseHeaven("1Second");
    const res3 = await promiseHeaven("1Third");

    console.log("results:");
    console.log([res1, res2, res3]);
}

main();


// ещё есть finally который срабатывает после всех .then() и .catch() ... .then() можно вызывать по цепочке, если логика позволяет:

const c_promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve('Resolving an asynchronous request!'), 2000)
})

// Chain a promise
c_promise
  .then((firstResponse) => {
    // Return a new value for the next 'then'
    return firstResponse + ' And chaining!'
  })
  .then((secondResponse) => {
    console.log(secondResponse)
  })