import './map-download.js';
import './user-notice.js';
import { renderPopups } from './map-download.js';
import { getData } from './api.js';
import { showAlert } from './util.js';

const NOTICE_COUNT = 10;

getData(
  (notice) => {
    renderPopups(notice.slice(0, NOTICE_COUNT));
  },
  (error) => showAlert(`Упс... ${error}`),
);
