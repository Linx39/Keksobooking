const ALERT_SHOW_TIME = 5000;

//Функция поиска случайного целого числа
const getRandomInteger = (min, max) =>  {
  if (min < 0 || max < 0) {
    return -1;
  }

  if (min >= max) {
    [min, max] = [max, min];
  }

  return Math.round((Math.random() * (max - min)) + min);
};

//Функция поиска случайного числа с точкой
const getRandom = (min, max, numberSimbol) => {
  if (min < 0 || max < 0) {
    return -1;
  }

  if (min >= max) {
    [min, max] = [max, min];
  }

  return Math.round( ((Math.random() * (max - min)) + min) *  Math.pow(10, numberSimbol) ) / Math.pow(10, numberSimbol);
};

//Функция поиска случайного элемента в массиве
const getRandomArrayElement = (elements) => {
  return(elements[getRandomInteger(0, elements.length-1)]);
}

//Функция создания массива случайной длины со случайными неповторяющимися значениями из базового массива
const getRandomArrayFromArray = (arrayValues) => {
  const randomArray = [];

  for ( let i = 0; i < getRandomInteger(0, arrayValues.length); i++) {
    const valuesNew = arrayValues[getRandomInteger(0, arrayValues.length-1)];
    if ( !(randomArray.some((element) => {return element === valuesNew})) ) {
      randomArray.push(valuesNew);
    }
  }

  return randomArray;
};


//Функция деактивации формы и блокирование полей
const formDisabled = () => {
  const elementDisabled = (form, field) => {
    const formFields = form.querySelectorAll(field);

    for (let element of formFields) {
      element.setAttribute('disabled', 'disabled');
    }
  }
  const adForm = document.querySelector('.ad-form');
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
  const adForm = document.querySelector('.ad-form');
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
}

//Функция проверки статуса запроса
const checkStatus = (response) => {
  if (response.ok) {
    return response;
  }

  throw new Error(`${response.status} — ${response.statusText}`);
}

export { getRandomInteger, getRandom, getRandomArrayElement, getRandomArrayFromArray, formDisabled, formEnabled, showAlert, checkStatus };
