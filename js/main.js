import './notice.js';
import './map-download.js';
import {renderPopups} from './map-download.js';

const ADVERTISIMENT_COUNT = 10;

fetch('https://23.javascript.pages.academy/keksobooking/data')
  .then((response) => response.json())
  .then((advertisements) => {
    renderPopups(advertisements.slice(0, ADVERTISIMENT_COUNT));
  });