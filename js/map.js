/* global L:readonly */

import { disableForm, enableFormAd, enableFormFilter } from './form-function.js'
import { createCostumPopup } from './popup.js';
import { filterForm } from './user-form.js';

const NOTICE_COUNT = 10;
const DIGIT = 5;

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

//Функция загрузки карты и активации формы
const loadMap = (cb) => {
  disableForm();

  map.on('load', () => {
    address.value = `${Center.LAT}, ${Center.LNG}`;
    mainMarker.addTo(map);
    enableFormAd();
    cb();
  })

  map.setView({
    lat: Center.LAT,
    lng: Center.LNG,
  }, 10);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    })
    .addTo(map)
};

//Функция премещения маркера
mainMarker.on('moveend', (evt) => {
  const markerLatLng = evt.target.getLatLng();
  address.value = `${markerLatLng.lat.toFixed(DIGIT)}, ${markerLatLng.lng.toFixed(DIGIT)}`;
});

//Функция возвращения маркера в центр
const moveMarkerCenter = () => {
  mainMarker.setLatLng({lat: Center.LAT, lng: Center.LNG});
  address.value = `${Center.LAT}, ${Center.LNG}`;
};

//Функция добавления меток объявлений
let popupMarkers = [];

const renderPopups = (popups) => {

  //Удаление старых меток и попапа перед загрузкой новых
  popupMarkers.forEach ((marker) => {
    map.removeLayer(marker);
  });
  popupMarkers = [];

  
  const popupPane = document.querySelector('.leaflet-popup-pane');              //фигня
  while (popupPane.firstChild) {
    popupPane.removeChild(popupPane.firstChild);
  }



  //Добавление маркеров объявлений на карту
  popups
    .filter (filterForm)
    .slice(0, NOTICE_COUNT)
    .forEach ((popup) => {
      const popupMarker = L.marker({
        lat: popup.location.lat,
        lng: popup.location.lng,
      },
      {
        icon: pinIcon,
      });

      popupMarkers.push(popupMarker)

      popupMarker
        .addTo(map)
        .bindPopup(
          createCostumPopup(popup),
          {
            keepInView: true,
          });
    });



  //Активация формы с фильтрами
  if (popups) {
    enableFormFilter();
  }
};

export { loadMap, renderPopups, moveMarkerCenter };
