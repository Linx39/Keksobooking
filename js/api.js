import { showAlert } from './util.js';

//Получение данных с сервера
const getData = (onSuccess) => {
  fetch('https://23.javascript.pages.academy/keksobookin/data')
    .then ((response) => {
      if (response.ok) {
        return response;
      } else {
        showAlert('Упс...')
      }
    })
    .then((response) => response.json())
    .then((notice) => {
      onSuccess(notice);
    })
};



export { getData };