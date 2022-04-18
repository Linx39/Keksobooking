const PRICE_MIN = {
  'bungalow': 0,
  'flat': 1000,
  'house': 5000,
  'palace': 10000,
}

const PRICE_MAX = 1000000;

const Title_Length = {
  MIN: 30,
  MAX: 100,
}

const Room_Capacities = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0],
}

const adForm = document.querySelector('.ad-form');
const title = adForm.querySelector('#title');
const type = adForm.querySelector('#type');
const price = adForm.querySelector('#price');
const adress = adForm.querySelector('[name="address"]');
const timein = adForm.querySelector('#timein');
const timeout = adForm.querySelector('#timeout');
const roomNumber = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');

title.value = 'nvdjfdfjdvjngvjdfudfhvjcvnjdfgfjgvnjnjfgfjgv';
price.value = '1500';

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
adress.setAttribute('readonly', 'readonly');

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

const onSuc = () => {console.log('ok!ok!')};

const setUserFormSubmit = (onSuccess) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const formData = new FormData(evt.target);

    fetch(
      'https://23.javascript.pages.academy/keksobooking',
      {
        method: 'POST',
        body: formData,
      },
    )
      .then((response) => {
        if (response.ok) {
          onSuccess()}
        else {
          console.log('err!!!');
        }})
      .catch((err) => {
        console.log(err);
      });
  })
};
setUserFormSubmit(onSuc);

export { setUserFormSubmit };