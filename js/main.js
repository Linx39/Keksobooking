import './map-download.js';
import './user-form.js';
import { renderPopups } from './map-download.js';
import { getData } from './api.js';
import { setUserFormSubmit, housingTypeChange } from './user-form.js';
import { showAlert, getMessage } from './form-function.js';

getData(
  (notice) => {
    renderPopups(notice);
    housingTypeChange(() => renderPopups(notice))
  },
  (error) => showAlert(`Упс... Ошибка загрузки данных... ${error}`),
);

setUserFormSubmit(() => getMessage(true));
