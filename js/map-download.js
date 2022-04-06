/* global L:readonly */

import { formDisabled, formEnabled } from './form-disable-enabled.js';

const Center = {
  LAT: 35.68950,
  LNG: 139.69171,
}

formDisabled();

const map = L.map('map-canvas')
  .on('load', () => {
    formEnabled();
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

const marker = L.marker(
  {
    lat: Center.LAT,
    lng: Center.LNG,
  },
  {
    draggable: true,
  },
);

marker.addTo(map);
