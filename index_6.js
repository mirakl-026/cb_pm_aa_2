// не смотря на то, что промисы топ, - был добавлен топовейший синтаксисческий сахар в виде async/await

async function getUsers() {
    return { data: 5};
}

console.log(getUsers());    // Promise { { data: 5} }   
// на самом деле такой ответ (бразуер)
// [[Prototype]]: Promise
// [[PromiseState]]: "fulfilled"
// [[PromiseResult]]: Object   
// то есть результат есть, как будто вызван resolve - значит можно обработкать с помощью then

getUsers().then((response) => console.log(response))    // { data: 5}

// следовательно прошлый запрос можно переделать (браузер):
// Handling success and errors with async/await
async function getUser() {
    try {
        // Handle success in try
        const response = await fetch('https://api.github.com/users/octocat')
        const data = await response.json()

        console.log(data)
    } catch (error) {
        // Handle error in catch
        console.error(error)
    }
}

getUser();