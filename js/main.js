import './map-download.js';
import './user-form.js';
import { renderPopups } from './map-download.js';
import { getData } from './api.js';
import { setUserFormSubmit } from './user-form.js';
import { showAlert, getMessage } from './form-function.js';


const NOTICE_COUNT = 10;

getData(
  (notice) => {
    renderPopups(notice.slice(0, NOTICE_COUNT));
  },
  (error) => showAlert(`Упс... Ошибка загрузки данных... ${error}`),
);

setUserFormSubmit(() => getMessage(true));
