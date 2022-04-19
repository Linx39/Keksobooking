// import './map-download.js';
// import './user-notice.js';
import {renderPopups} from './map-download.js';
import { getData } from './api.js';
import { showAlert } from './util.js';

const NOTICE_COUNT = 10;

getData(
  (notice) => {
    renderPopups(notice.slice(0, NOTICE_COUNT));
  },
);

// fetch('https://23.javascript.pages.academy/keksobooking/data')
//   .then((response) => response.json())
//   .then((notice) => {
//     renderPopups(notice.slice(0, NOTICE_COUNT));
//   });