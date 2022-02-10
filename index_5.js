// так как промисы афигенные и могут вызываться по цепочке был создан fetch API
// используется 2 then - 1 отвечает за получение данных в сыром виде (с хедерами и т.д.)
// его then возвращает уже данные пригодные для работы пример (для браузера):
// Fetch a user from the GitHub API
fetch('https://api.github.com/users/octocat')       // асинхронный запрос, ожидающий результат, далее вызывается then 
  .then((response) => {
    return response.json()      // этот then получает полный ответ, и возвращает промис с данными в формате JSON (только нужные)
  })
  .then((data) => {
    console.log(data)   // этот then уже получил в data JSON объект без всякого лишнего и тут можно работать с данными
  })
  .catch((error) => {
    console.error(error)    // на случай ошибки
  })