import { isEscEvent } from './util.js';
import { resetForm } from './user-form.js';

const ALERT_SHOW_TIME = 5000;
const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');

//Функция блокирования/разблокирования полей формы
const disableEnableElement = (form, field, isEnabled) => {
  const formFields = form.querySelectorAll(field);

  for (let element of formFields) {
    if (isEnabled) {
      element.removeAttribute('disabled');
    } else {
      element.setAttribute('disabled', 'disabled');
    }
  }
};

//Функция деактивации формы и блокирования полей
const disableForm = () => {
  adForm.classList.add('ad-form--disabled');
  disableEnableElement(adForm, 'fieldset', false)

  mapFilters.classList.add('map__filters--disabled');
  disableEnableElement(mapFilters, 'fieldset', false);
  disableEnableElement(mapFilters, 'select', false);
};

//Функции активации форм и разблокирования полей
const enableFormAd = () => {
  adForm.classList.remove('ad-form--disabled');
  disableEnableElement(adForm, 'fieldset', true)
};

const enableFormFilter = () => {
  mapFilters.classList.remove('map__filters--disabled');
  disableEnableElement(mapFilters, 'fieldset', true);
  disableEnableElement(mapFilters, 'select', true);
};

//Функция создания блока с сообщением
const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'white';
  alertContainer.style.borderColor = 'red';
  alertContainer.style.borderWidth = '5px';
  alertContainer.style.borderStyle = 'dashed';
  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const getMessage = (isSuccess) => {
  let result = 'error';
  if (isSuccess) {
    result = 'success';
  }

  const messageSubmit = document.querySelector(`#${result}`).content.querySelector(`.${result}`).cloneNode(true);

  document.body.append(messageSubmit);

  let onMessageEscKeydown = null;

  const closeMessageSubmit = () => {
    messageSubmit.classList.add('hidden');
    document.removeEventListener('keydown', onMessageEscKeydown);
    if (isSuccess) {
      resetForm();
    }
  };

  onMessageEscKeydown = (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      closeMessageSubmit();
    }
  };

  const onMessageClick = () => {
    closeMessageSubmit();
  };

  document.addEventListener('keydown', onMessageEscKeydown);
  messageSubmit.addEventListener('click', onMessageClick);
};

export { disableForm, enableFormAd, enableFormFilter, showAlert, getMessage };
