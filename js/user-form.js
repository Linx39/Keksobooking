import { getData, sendData } from './api.js';
import { renderPopups, moveMarkerCenter } from './map.js';
import { getMessage, showAlert } from './form-function.js';
import { clearImage } from './image-download.js';

const Default = {
  HOUSING_TYPE: 'any',
  HOUSING_PRICE: 'any',
  HOUSING_ROOMS: 'any',
  HOUSING_GUEST: 'any',
};
const PRICE_MIN = {
  'bungalow': 0,
  'flat': 1000,
  'house': 5000,
  'palace': 10000,
};
const PRICE_MAX = 1000000;
const Price_Rank = {
  'low': 10000,
  'middle': 50000,
};
const Title_Length = {
  MIN: 30,
  MAX: 100,
};
const Room_Capacities = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0],
};

const adForm = document.querySelector('.ad-form');
const title = adForm.querySelector('#title');
const type = adForm.querySelector('#type');
const price = adForm.querySelector('#price');
const address = adForm.querySelector('[name="address"]');
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


title.value = 'nvdjfdfjdvjngvjdfudfhvjcvnjdfgfjgvnjnjfgfjgv';                     //для проверки
price.value = '1500';                                                             //для проверки

//Валидация поля "заголовок"
title.addEventListener('input', () => {
  const titleLength = title.value.length;

  if (titleLength < Title_Length.MIN) {
    title.setCustomValidity(`Минимальное количество символов ${Title_Length.MIN}. Осталось добавить символов: ${Title_Length.MIN - titleLength}.`);
  } else if (titleLength > Title_Length.MAX) {
    title.setCustomValidity(`Максимальное количество символов ${Title_Length.MAX}. Уберите символов: ${titleLength - Title_Length.MAX}.`);
  } else {
    title.setCustomValidity('');
  }

  title.reportValidity();
});

//Запрет редактирования поля "адрес"
address.setAttribute('readonly', 'readonly');

//Установка минимальных значений поля "цена" в зависимости от выбора поля "тип жилья"
type.addEventListener('change', () => {
  price.min = PRICE_MIN[type.value];
  price.placeholder = PRICE_MIN[type.value];
  price.value = '';
  price.setCustomValidity('');
});

//Валидация поля "цена"
price.addEventListener ('input', () => {
  if (price.value > PRICE_MAX) {
    price.setCustomValidity(`Цена не может быть больше ${PRICE_MAX} ₽/ночь`);
  } else {
    price.setCustomValidity('');
  }

  if (price.value < PRICE_MIN[type.value]) {
    price.setCustomValidity(`Цена данного типа жилья не может быть меньше ${PRICE_MIN[type.value]} ₽/ночь`);
  } else {
    price.setCustomValidity('');
  }

  price.reportValidity();
});

//Синхронизация полей "заезд"/"выезд"
timein.addEventListener('change', () => {
  timeout.value = timein.value;
});

timeout.addEventListener('change', () => {
  timein.value = timeout.value;
});

//Синхронизация полей "количество комнат"/"количество гостей"
const disabledCapasity = () => {
  const roomCapacities = Room_Capacities[roomNumber.value];
  const capacityValues = capacity.querySelectorAll('[value]');

  capacityValues.forEach ((capacityValue) => {
    capacityValue.setAttribute('disabled', 'disabled');

    if ( roomCapacities.some((element) => {
      return element === Number(capacityValue.value);
    }) ) {
      capacityValue.removeAttribute('disabled');
    }
  });

  capacity.value = roomCapacities[0];
};

disabledCapasity();

roomNumber.addEventListener('change', () => {
  disabledCapasity();
});

//Функции, отслеживающие изменения фильтров
const changeHousingType = (cb) => {
  housingType.addEventListener('change', () => cb())
};

const changeHousingPrice = (cb) => {
  housingPrice.addEventListener('change', () => cb())
};

const changeHousingRooms = (cb) => {
  housingRooms.addEventListener('change', () => cb())
};

const changeHousingGuests = (cb) => {
  housingGuests.addEventListener('change', () => cb())
};

const changeFilterWifi = (cb) => {
  filterWifi.addEventListener('click', () => cb())
};

const changeFilterDishwasher = (cb) => {
  filterDishwasher.addEventListener('click', () => cb())
};

const changeFilterParking = (cb) => {
  filterParking.addEventListener('click', () => cb())
};

const changeFilterWasher = (cb) => {
  filterWasher.addEventListener('click', () => cb())
};

const changeFilterElevator = (cb) => {
  filterElevator.addEventListener('click', () => cb())
};

const changeFilterConditioner = (cb) => {
  filterConditioner.addEventListener('click', () => cb())
};

//Функция фильтра попапов
const filterForm = (popup) => {
  let isTrueHousingType = false;
  if (Default.HOUSING_TYPE === housingType.value || popup.offer.type === housingType.value) {
    isTrueHousingType = true;
  }

  let priceValue;
  if (popup.offer.price < Price_Rank.low) {
    priceValue = 'low';
  }
  if (popup.offer.price >= Price_Rank.low & popup.offer.price <= Price_Rank.middle) {
    priceValue = 'middle';
  }
  if (popup.offer.price > Price_Rank.middle) {
    priceValue = 'high';
  }

  let isTrueHousingPrice = false;
  if (Default.HOUSING_PRICE === housingPrice.value || priceValue === housingPrice.value) {
    isTrueHousingPrice = true;
  }

  let isTrueHousingRooms = false;
  if (Default.HOUSING_ROOMS === housingRooms.value || String(popup.offer.rooms) === housingRooms.value) {
    isTrueHousingRooms = true;
  }

  let isTrueHousingGuests = false;
  if (Default.HOUSING_GUEST === housingGuests.value || String(popup.offer.guests) === housingGuests.value) {
    isTrueHousingGuests = true;
  }

  const getIsFilter = (filterElement) => {
    let isFilter = false;

    let isFilterElement = true;
    if (Array.isArray(popup.offer.features)) {
      isFilterElement = popup.offer.features.some( element => {return(element === filterElement.value)} );
    }

    if (filterElement.checked & isFilterElement || !filterElement.checked) {
      isFilter = true;
    }

    return isFilter;
  };

  const isFilterWifi = getIsFilter(filterWifi);
  const isFilterDishwasher = getIsFilter(filterDishwasher);
  const isFilterParking = getIsFilter(filterParking);
  const isFilterWasher = getIsFilter(filterWasher);
  const isFilterElevator = getIsFilter(filterElevator);
  const isFilterConditioner = getIsFilter(filterConditioner);

  if (isTrueHousingType & isTrueHousingPrice & isTrueHousingRooms & isTrueHousingGuests & isFilterWifi & isFilterDishwasher & isFilterParking & isFilterWasher & isFilterElevator & isFilterConditioner) {
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
  disabledCapasity();
  moveMarkerCenter();
};

buttonReset.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForm();
});

//Функция отправки формы
const setUserFormSubmit = (onSuccess) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData (
      () => onSuccess(),
      () => getMessage(false),
      new FormData(evt.target),
    );
  });
};

export { setUserFormSubmit, resetForm, filterForm, changeHousingType, changeHousingPrice, changeHousingRooms, changeHousingGuests, changeFilterWifi, changeFilterDishwasher, changeFilterParking, changeFilterWasher, changeFilterElevator, changeFilterConditioner };
