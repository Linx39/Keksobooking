import { getData, sendData } from './api.js';
import { renderPopups, moveMarkerCenter, mapSetViewCenter } from './map.js';
import { clearImage } from './image-download.js';
import { isEscEvent, showAlert } from './util.js';

const priceMin = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
};

const PRICE_MAX = 1000000;

const Title_Length = {
  MIN: 30,
  MAX: 100,
};

const roomCapacity = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0],
};

const adForm = document.querySelector('.ad-form');
const title = adForm.querySelector('#title');
const type = adForm.querySelector('#type');
const price = adForm.querySelector('#price');
const address = adForm.querySelector('#address');
const timein = adForm.querySelector('#timein');
const timeout = adForm.querySelector('#timeout');
const roomNumber = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');
const buttonReset = adForm.querySelector('.ad-form__reset');

const mapFilters = document.querySelector('.map__filters');

//Функция, блокирующаяя невалидные значения "количества гостей"
const disableCapacity = () => {
  const roomCapacities = roomCapacity[roomNumber.value];
  const valueCapacities = capacity.querySelectorAll('[value]');

  valueCapacities.forEach ((valueCapacity) => {
    valueCapacity.disabled = true;

    if ( roomCapacities.some((element) => {
      return element === Number(valueCapacity.value);
    }) ) {
      valueCapacity.disabled = false;
    }
  });

  capacity.value = roomCapacities[0];
};

//Функции блокирования/разблокирования полей формы
const disableElement = (form, field) => {
  const formFields = form.querySelectorAll(field);

  for (let element of formFields) {
    element.disabled = true;
  }
};

const enableElement = (form, field) => {
  const formFields = form.querySelectorAll(field);

  for (let element of formFields) {
    element.disabled = false;
  }
};

//Функция деактивации форм и блокирования полей
const disableForms = () => {
  adForm.classList.add('ad-form--disabled');
  disableElement(adForm, 'fieldset')

  mapFilters.classList.add('map__filters--disabled');
  disableElement(mapFilters, ['fieldset', 'select'].join());
};

//Функции активации форм и разблокирования полей
const enableFormAd = () => {
  adForm.classList.remove('ad-form--disabled');
  enableElement(adForm, 'fieldset');
  disableCapacity();
};

const enableFormFilter = () => {
  mapFilters.classList.remove('map__filters--disabled');
  enableElement(mapFilters, ['fieldset', 'select'].join());
};

//Валидация поля "заголовок"
const checkLengthTitle = () => {
  const titleLength = title.value.length;

  if (titleLength < Title_Length.MIN) {
    title.setCustomValidity(`Минимальное количество символов ${Title_Length.MIN}. Осталось добавить символов: ${Title_Length.MIN - titleLength}.`);
  } else if (titleLength > Title_Length.MAX) {
    title.setCustomValidity(`Максимальное количество символов ${Title_Length.MAX}. Уберите символов: ${titleLength - Title_Length.MAX}.`);
  } else {
    title.setCustomValidity('');
  }

  title.reportValidity();
};

title.addEventListener('input', () => checkLengthTitle());

//Запрет редактирования поля "адрес"
address.readOnly = true;

//Валидация поля "цена"
const checkPriceValue = () => {
  if (price.value > PRICE_MAX) {
    price.setCustomValidity(`Цена не может быть больше ${PRICE_MAX} ₽/ночь`);
  } else {
    price.setCustomValidity('');
  }

  if (price.value < priceMin[type.value]) {
    price.setCustomValidity(`Цена данного типа жилья не может быть меньше ${priceMin[type.value]} ₽/ночь`);
  } else {
    price.setCustomValidity('');
  }

  price.reportValidity();
}

price.addEventListener ('input', () => checkPriceValue());

//Установка минимальных значений поля "цена" в зависимости от выбора поля "тип жилья"
type.addEventListener('change', () => {
  price.min = priceMin[type.value];
  price.placeholder = priceMin[type.value];
  checkPriceValue();
});

//Синхронизация полей "заезд"/"выезд"
timein.addEventListener('change', () => {
  timeout.value = timein.value;
});

timeout.addEventListener('change', () => {
  timein.value = timeout.value;
});

//Синхронизация полей "количество комнат"/"количество гостей"
roomNumber.addEventListener('change', () => disableCapacity());


//Функция очистки формы
const resetForm = () => {
  mapFilters.reset();
  adForm.reset();

  mapSetViewCenter();
  moveMarkerCenter();

  getData((notice) => {
    renderPopups(notice);
  },
  (error) => showAlert(`Упс... Ошибка загрузки данных... ${error}`),
  );
  
  clearImage();
  price.placeholder = priceMin[type.value];
  disableCapacity();
};

buttonReset.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForm();
});

//Функция получения сообщения об отправке формы
const messageSubmitSuccess = document.querySelector('#success').content.querySelector('.success');
const messageSubmitError = document.querySelector('#error').content.querySelector('.error');

const getMessage = (isSuccess) => {
  let messageSubmit = messageSubmitSuccess;
  if (!isSuccess) {
    messageSubmit = messageSubmitError;
  }

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

//Функция отправки формы
const setUserFormSubmit = () => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData (
      () => getMessage(true),
      () => getMessage(false),
      new FormData(evt.target),
    );
  });
};

export {
  disableForms,
  enableFormAd,
  enableFormFilter,
  setUserFormSubmit,
  resetForm
};
