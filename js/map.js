/* global L:readonly */

import { enabledFormAd, enabledFormFilter } from './form-function.js'
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
const marker = L.marker(
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
const map = L.map('map-canvas')
  .on('load', () => {
    address.value = `${Center.LAT}, ${Center.LNG}`;
  })
  .setView({
    lat: Center.LAT,
    lng: Center.LNG,
  }, 10);

//Функция загрузки карты
const downloadMap = () => {
  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    })
    .addTo(map)
    .on('tileload', () => {
      marker.addTo(map);
      enabledFormAd();
      // cb();
    });
}

//Функция премещения маркера
marker.on('moveend', (evt) => {
  const markerLatLng = evt.target.getLatLng();
  address.value = `${markerLatLng.lat.toFixed(DIGIT)}, ${markerLatLng.lng.toFixed(DIGIT)}`;
});

//Функция возвращения маркера в центр
const moveMarkerCenter = () => {
  marker.setLatLng({lat: Center.LAT, lng: Center.LNG});
  address.value = `${Center.LAT}, ${Center.LNG}`;
};

//Функция добавления меток объявлений
const renderPopups = (popups) => {
  const pinIcon = L.icon({
    iconUrl: './img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  //Удаление старых меток и попапа перед загрузкой новых
  const markerPane = document.querySelector('.leaflet-marker-pane');           //фигня ???marker.remove();
  while (markerPane.children.length > 1) {
    markerPane.removeChild(markerPane.lastChild);
  }
  const popupPane = document.querySelector('.leaflet-popup-pane');              //фигня
  while (popupPane.firstChild) {
    popupPane.removeChild(popupPane.firstChild);
  }

  //Добавление маркеров объявлений на карту
  popups
    .filter (filterForm)
    .slice(0, NOTICE_COUNT)
    .forEach ((popup) => {
      const marker = L.marker({
        lat: popup.location.lat,
        lng: popup.location.lng,
      },
      {
        icon: pinIcon,
      });

      marker
        .addTo(map)
        .bindPopup(
          createCostumPopup(popup),
          {
            keepInView: true,
          });
    });

  //Активация формы с фильтрами
  if (popups) {
    enabledFormFilter();
  }
};

export { downloadMap, renderPopups, moveMarkerCenter};