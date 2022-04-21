import './map-download.js';
import './user-notice.js';
import { renderPopups } from './map-download.js';
import { getData } from './api.js';
import { showAlert, isEscEvent } from './util.js';
import { setUserFormSubmit, formReset } from './user-notice.js';

const NOTICE_COUNT = 10;

getData(
  (notice) => {
    renderPopups(notice.slice(0, NOTICE_COUNT));
  },
  (error) => showAlert(`Упс... ${error}`),
);

const successMessage = (isSuccess) => {
  let result = '';
  
  if (isSuccess) {
    result = 'success';
  }

  const templateSuccess = document.querySelector(`#${result}`).content.querySelector(`.${result}`);
  const messageSuccess = templateSuccess.cloneNode(true);
  document.body.append(messageSuccess);

  const onMessageEscKeydown = (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      messageSuccess.classList.add('hidden');
      formReset();
    }
  };

  const onMessageClick = () => {
    messageSuccess.classList.add('hidden');
    formReset();
  }

  document.addEventListener('keydown', onMessageEscKeydown);
  messageSuccess.addEventListener('click', onMessageClick);
};

setUserFormSubmit(() => {successMessage(true)});
