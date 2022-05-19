import { checkStatus } from './util.js';

const Urls = {
  GET: 'https://23.javascript.pages.academy/keksobooking/data',
  SEND: 'https://23.javascript.pages.academy/keksobooking',
}

//Получение данных с сервера
const getData = (onSuccess, onError) => {
  fetch(Urls.GET)
    .then(checkStatus)
    .then((response) => response.json())
    .then((json) => onSuccess(json))
    .catch((error) => onError(error));
};

//Отправка данных на сервер
const sendData = (onSuccess, onError, body) => {
  fetch(
    Urls.SEND,
    {
      method: 'POST',
      body: body,
    })
    .then (checkStatus)
    .then (() => onSuccess())
    .catch(() => onError());
};

export { getData, sendData };
