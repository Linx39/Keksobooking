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
    .catch((error) => {
      onError(error);
    });
};

const sendData = (onSuccess, onError, body) => {
  fetch(
    'https://23.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body: body,
    })
    .then (checkStatus)
    .then (() => onSuccess())
    .catch((error) => {
      onError(error);
    });
};

export { getData, sendData };
