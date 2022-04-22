import { isEscEvent } from './util.js';
import { formReset } from './user-form.js';

const ALERT_SHOW_TIME = 5000;

const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');

//Функция блокирования/разблокирования полей формы
const disabledEnebledElement = (form, field, isEnabled) => {
  const formFields = form.querySelectorAll(field);

  for (let element of formFields) {
    if (isEnabled) {
      element.removeAttribute('disabled');
    } else {
      element.setAttribute('disabled', 'disabled');
    }
  }
}

//Функция деактивации формы и блокирования полей
const disabledForm = () => {
  adForm.classList.add('ad-form--disabled');
  disabledEnebledElement(adForm, 'fieldset', false)
  
  mapFilters.classList.add('map__filters--disabled');
  disabledEnebledElement(mapFilters, 'fieldset', false);
  disabledEnebledElement(mapFilters, 'select', false);
}

//Функция активации формы и разблокирования полей
const enabledForm = () => {
  adForm.classList.remove('ad-form--disabled');
  disabledEnebledElement(adForm, 'fieldset', true)
  
  mapFilters.classList.remove('map__filters--disabled');
  disabledEnebledElement(mapFilters, 'fieldset', true);
  disabledEnebledElement(mapFilters, 'select', true);
}

//Функция создания блока с сообщением
const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.display = 'block';
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  // alertContainer.style.width = '100%';
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

  const templateSuccess = document.querySelector(`#${result}`).content.querySelector(`.${result}`);
  const messageSuccess = templateSuccess.cloneNode(true);
  document.body.append(messageSuccess);

  const onMessageEscKeydown = (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      messageSuccess.classList.add('hidden');
      if (isSuccess) {
        formReset();
      }
    }
  };

  const onMessageClick = () => {
    messageSuccess.classList.add('hidden');
    if (isSuccess) {
      formReset();
    }
  };

  document.addEventListener('keydown', onMessageEscKeydown);
  messageSuccess.addEventListener('click', onMessageClick);
};

export { disabledForm, enabledForm, showAlert, getMessage };