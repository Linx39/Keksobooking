import { isEscEvent } from './util.js';
import { formReset } from './user-form.js';

const ALERT_SHOW_TIME = 5000;

const adForm = document.querySelector('.ad-form');

//Функция деактивации формы и блокирование полей
const formDisabled = () => {
  const elementDisabled = (form, field) => {
    const formFields = form.querySelectorAll(field);

    for (let element of formFields) {
      element.setAttribute('disabled', 'disabled');
    }
  }
  
  adForm.classList.add('ad-form--disabled');

  elementDisabled(adForm, 'fieldset')

  const mapFilters = document.querySelector('.map__filters');
  mapFilters.classList.add('map__filters--disabled');

  elementDisabled(mapFilters, 'fieldset');
  elementDisabled(mapFilters, 'select');
}

//Функция активации формы и разблокирования полей
const formEnabled = () => {
  const elementEnabled = (form, field) => {
    const formFields = form.querySelectorAll(field);

    for (let element of formFields) {
      element.removeAttribute('disabled');
    }
  }

  adForm.classList.remove('ad-form--disabled');

  elementEnabled(adForm, 'fieldset')

  const mapFilters = document.querySelector('.map__filters');
  mapFilters.classList.remove('map__filters--disabled');

  elementEnabled(mapFilters, 'fieldset');
  elementEnabled(mapFilters, 'select');
}

//Функция создания блока с сообщением
const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  // alertContainer.style.width = '50%';
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
  }

  document.addEventListener('keydown', onMessageEscKeydown);
  messageSuccess.addEventListener('click', onMessageClick);
};

export { formDisabled, formEnabled, showAlert, getMessage };