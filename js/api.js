import { checkStatus } from './util.js';

//Получение данных с сервера
const getData = (onSuccess, onError) => {
  fetch('https://23.javascript.pages.academy/keksobooking/data')
    .then(checkStatus)
    .then((response) => response.json())
    .then((json) => {
      onSuccess(json);
    })
    // .catch ((error) => {showAlert(`Упс... ${error}`)})
    .catch((err) => {
      onError(err);
    });
};



export { getData };
