/* global L:readonly */

import { createCustomPopup } from './popup.js';
import { disableForms, enableFormAd, enableFormFilter } from './user-form.js';
import { filterPopup } from './filters.js';

const NOTICE_COUNT = 10;
const NUMBER_OF_DIGIT = 5;

const Center = {
  LAT: 35.68950,
  LNG: 139.69171,
};

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const pinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const map = L.map('map-canvas');

const mainMarker = L.marker(
  {
    lat: Center.LAT,
    lng: Center.LNG,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

const address = document.querySelector('[name="address"]');

//Функция централизации карты
const mapSetViewCenter = () => {
  map.setView({
    lat: Center.LAT,
    lng: Center.LNG,
  }, 10);
};

//Функция загрузки карты и активации формы
const loadMap = (cb) => {
  disableForms();

  map.on('load', () => {
    address.value = `${Center.LAT.toFixed(NUMBER_OF_DIGIT)}, ${Center.LNG.toFixed(NUMBER_OF_DIGIT)}`;
    mainMarker.addTo(map);
    enableFormAd();
    cb();
  })

  mapSetViewCenter();

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    })
    .addTo(map)
};

//Функция премещения маркера
mainMarker.on('move', (evt) => {
  const markerLatLng = evt.target.getLatLng();
  address.value = `${markerLatLng.lat.toFixed(NUMBER_OF_DIGIT)}, ${markerLatLng.lng.toFixed(NUMBER_OF_DIGIT)}`;
});

//Функция возвращения маркера в центр
const moveMarkerCenter = () => {
  mainMarker.setLatLng({lat: Center.LAT, lng: Center.LNG});
  address.value = `${Center.LAT.toFixed(NUMBER_OF_DIGIT)}, ${Center.LNG.toFixed(NUMBER_OF_DIGIT)}`;
};

//Функция добавления меток объявлений
let popupMarkers = [];

const renderPopups = (popups) => {

  //Удаление предыдущих маркеров перед загрузкой новых
  popupMarkers.forEach ((marker) => {
    map.removeLayer(marker);
  });
  popupMarkers = [];

  //Добавление маркеров объявлений на карту
  popups
    .filter (filterPopup)
    .slice(0, NOTICE_COUNT)
    .forEach ((popup) => {
      const popupMarker = L.marker({
        lat: popup.location.lat,
        lng: popup.location.lng,
      },
      {
        icon: pinIcon,
      });

      popupMarkers.push(popupMarker);

      popupMarker
        .addTo(map)
        .bindPopup(
          createCustomPopup(popup),
          {
            keepInView: true,
          });
    });

  //Активация формы с фильтрами
  if (popups) {
    enableFormFilter();
  }
};

export { loadMap, renderPopups, moveMarkerCenter, mapSetViewCenter };
