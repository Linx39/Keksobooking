/* global _:readonly */

import './map-download.js';
import './user-form.js';
import './image-download.js';
import { renderPopups } from './map-download.js';
import { getData } from './api.js';
import { setUserFormSubmit, changeHousingType, changeHousingPrice, changeHousingRooms, changeHousingGuests, changeFilterWifi, changeFilterDishwasher, changeFilterParking, changeFilterWasher, changeFilterElevator, changeFilterConditioner } from './user-form.js';
import { showAlert, getMessage } from './form-function.js';

const RERENDER_DELAY = 500;

getData(
  (notice) => {
    renderPopups(notice);
    changeHousingType(_.debounce(() => renderPopups(notice), RERENDER_DELAY));
    changeHousingPrice(_.debounce(() => renderPopups(notice), RERENDER_DELAY));
    changeHousingRooms(_.debounce(() => renderPopups(notice), RERENDER_DELAY));
    changeHousingGuests(_.debounce(() => renderPopups(notice), RERENDER_DELAY));
    changeFilterWifi(_.debounce(() => renderPopups(notice), RERENDER_DELAY));
    changeFilterDishwasher(_.debounce(() => renderPopups(notice), RERENDER_DELAY));
    changeFilterParking(_.debounce(() => renderPopups(notice), RERENDER_DELAY));
    changeFilterWasher(_.debounce(() => renderPopups(notice), RERENDER_DELAY));
    changeFilterElevator(_.debounce(() => renderPopups(notice), RERENDER_DELAY));
    changeFilterConditioner(_.debounce(() => renderPopups(notice), RERENDER_DELAY));
  },
  (error) => showAlert(`Упс... Ошибка загрузки данных... ${error}`),
);

setUserFormSubmit(() => getMessage(true));
