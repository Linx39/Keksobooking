/* global L:readonly */

import { formDisabled, formEnabled } from './util.js';
import { createCostumPopup } from './popup.js';

const Center = {
  LAT: 35.68950,
  LNG: 139.69171,
}

const address = document.querySelector('[name="address"]');

//Деактивация страницы до загрузки карты
formDisabled();

//Загрузка карты
const map = L.map('map-canvas')
  .on('load', () => {
    formEnabled();
    address.value = `${Center.LAT}, ${Center.LNG}`;
  })
  .setView({
    lat: Center.LAT,
    lng: Center.LNG,
  }, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

//Добавление главной метки
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

marker.addTo(map);

marker.on('moveend', (evt) => {
  const markerLatLng = evt.target.getLatLng();
  address.value = `${markerLatLng.lat.toFixed(5)}, ${markerLatLng.lng.toFixed(5)}`;
});

//Функция добавления меток объявлений
const renderPopups = (popups) => {
  const pinIcon = L.icon({
    iconUrl: './img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });
  
  popups.forEach ((popup) => {
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
  })
}

export { renderPopups };