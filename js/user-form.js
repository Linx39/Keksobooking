import { getData, sendData } from './api.js';
import { renderPopups, moveMarkerCenter } from './map.js';
import { clearImage } from './image-download.js';
import { isEscEvent, showAlert } from './util.js';

const Default_Value = {
  HOUSING_TYPE: 'any',
  HOUSING_PRICE: 'any',
  HOUSING_ROOMS: 'any',
  HOUSING_GUEST: 'any',
};

const priceMin = {
  'bungalow': 0,
  'flat': 1000,
  'house': 5000,
  'palace': 10000,
};

const PRICE_MAX = 1000000;

const priceRank = {
  'low': 10000,
  'middle': 50000,
};

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
const housingType = mapFilters.querySelector('#housing-type');
const housingPrice = mapFilters.querySelector('#housing-price');
const housingRooms = mapFilters.querySelector('#housing-rooms');
const housingGuests = mapFilters.querySelector('#housing-guests');
const filterWifi = mapFilters.querySelector('#filter-wifi');
const filterDishwasher = mapFilters.querySelector('#filter-dishwasher');
const filterParking = mapFilters.querySelector('#filter-parking');
const filterWasher = mapFilters.querySelector('#filter-washer');
const filterElevator = mapFilters.querySelector('#filter-elevator');
const filterConditioner = mapFilters.querySelector('#filter-conditioner');

//Функция, блокирующаяя невалидные значения "количества гостей"
const disableCapasity = () => {
  const roomCapacities = roomCapacity[roomNumber.value];
  const valueCapacities = capacity.querySelectorAll('[value]');

  valueCapacities.forEach ((valueCapacity) => {
    valueCapacity.setAttribute('disabled', 'disabled');

    if ( roomCapacities.some((element) => {
      return element === Number(valueCapacity.value);
    }) ) {
      valueCapacity.removeAttribute('disabled');
    }
  });

  capacity.value = roomCapacities[0];
};

//Функции блокирования/разблокирования полей формы
const disableElement = (form, field) => {
  const formFields = form.querySelectorAll(field);

  for (let element of formFields) {
    element.setAttribute('disabled', 'disabled');
  }
};

const enableElement = (form, field) => {
  const formFields = form.querySelectorAll(field);

  for (let element of formFields) {
    element.removeAttribute('disabled');
  }
};

//Функция деактивации форм и блокирования полей
const disableForms = () => {
  adForm.classList.add('ad-form--disabled');
  disableElement(adForm, 'fieldset')

  mapFilters.classList.add('map__filters--disabled');
  disableElement(mapFilters, 'fieldset');
  disableElement(mapFilters, 'select');
};

//Функции активации форм и разблокирования полей
const enableFormAd = () => {
  adForm.classList.remove('ad-form--disabled');
  enableElement(adForm, 'fieldset');
  disableCapasity();
};

const enableFormFilter = () => {
  mapFilters.classList.remove('map__filters--disabled');
  enableElement(mapFilters, 'fieldset');
  enableElement(mapFilters, 'select');
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
address.setAttribute('readonly', 'readonly');

//Установка минимальных значений поля "цена" в зависимости от выбора поля "тип жилья"
type.addEventListener('change', () => {
  price.min = priceMin[type.value];
  price.placeholder = priceMin[type.value];
  price.value = '';
  price.setCustomValidity('');
});

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

//Синхронизация полей "заезд"/"выезд"
timein.addEventListener('change', () => {
  timeout.value = timein.value;
});

timeout.addEventListener('change', () => {
  timein.value = timeout.value;
});

//Синхронизация полей "количество комнат"/"количество гостей"
roomNumber.addEventListener('change', () => disableCapasity());

//Функции, отслеживающие изменения фильтров
const onHousingTypeChange = (cb) => {
  housingType.addEventListener('change', () => cb())
};

const onHousingPriceChange = (cb) => {
  housingPrice.addEventListener('change', () => cb())
};

const onHousingRoomsChange = (cb) => {
  housingRooms.addEventListener('change', () => cb())
};

const onHousingGuestsChange = (cb) => {
  housingGuests.addEventListener('change', () => cb())
};

const onFilterWifiClick = (cb) => {
  filterWifi.addEventListener('click', () => cb())
};

const onFilterDishwasherClick  = (cb) => {
  filterDishwasher.addEventListener('click', () => cb())
};

const onFilterParkingClick  = (cb) => {
  filterParking.addEventListener('click', () => cb())
};

const onFilterWasherClick  = (cb) => {
  filterWasher.addEventListener('click', () => cb())
};

const onFilterElevatorClick  = (cb) => {
  filterElevator.addEventListener('click', () => cb())
};

const onFilterConditionerClick  = (cb) => {
  filterConditioner.addEventListener('click', () => cb())
};

//Функция, определяющая правила фильтрация попапов
const filterPopup = ({offer: {price, type, rooms, guests, features}}) => {
  let isHousingType = false;
  if (housingType.value === Default_Value.HOUSING_TYPE || housingType.value === type) {
    isHousingType = true;
  }

  let priceValue;
  if (price < priceRank.low) {
    priceValue = 'low';
  }
  if (price >= priceRank.low & price <= priceRank.middle) {
    priceValue = 'middle';
  }
  if (price > priceRank.middle) {
    priceValue = 'high';
  }

  let isHousingPrice = false;
  if (housingPrice.value === Default_Value.HOUSING_PRICE || housingPrice.value === priceValue) {
    isHousingPrice = true;
  }

  let isHousingRooms = false;
  if (housingRooms.value === Default_Value.HOUSING_ROOMS || housingRooms.value === String(rooms)) {
    isHousingRooms = true;
  }

  let isHousingGuests = false;
  if (housingGuests.value === Default_Value.HOUSING_GUEST || housingGuests.value === String(guests)) {
    isHousingGuests = true;
  }

  //Функция, проверяющая выбран ли элемент для фильтра
  const isFilterElement = (filterElement) => {
    let isFilter = false;

    let isElement = true;
    if (Array.isArray(features)) {
      isElement = features.some( element => {return filterElement.value === element} );
    }

    if (filterElement.checked & isElement || !filterElement.checked) {
      isFilter = true;
    }

    return isFilter;
  };

  const isFilterWifi = isFilterElement(filterWifi);
  const isFilterDishwasher = isFilterElement(filterDishwasher);
  const isFilterParking = isFilterElement(filterParking);
  const isFilterWasher = isFilterElement(filterWasher);
  const isFilterElevator = isFilterElement(filterElevator);
  const isFilterConditioner = isFilterElement(filterConditioner);

  if (isHousingType & isHousingPrice & isHousingRooms & isHousingGuests & isFilterWifi & isFilterDishwasher & isFilterParking & isFilterWasher & isFilterElevator & isFilterConditioner) {
    return true;
  }
};

//Функции очистки формы
const resetForm = () => {
  mapFilters.reset();
  getData((notice) => {
    renderPopups(notice);
  },
  (error) => showAlert(`Упс... Ошибка загрузки данных... ${error}`),
  );
  adForm.reset();
  clearImage();
  disableCapasity();
  moveMarkerCenter();
};

buttonReset.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForm();
});

//Функция получения сообщения об отправке формы
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

export { disableForms, enableFormAd, enableFormFilter, setUserFormSubmit, resetForm, filterPopup, onHousingGuestsChange, onHousingPriceChange, onHousingRoomsChange, onHousingTypeChange, onFilterConditionerClick, onFilterDishwasherClick,onFilterElevatorClick,onFilterParkingClick, onFilterWasherClick, onFilterWifiClick };
