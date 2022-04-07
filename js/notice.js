const MIN_PRICE ={
  'bungalow': 0,
  'flat': 1000,
  'house': 5000,
  'palace': 10000,
}

const type = document.querySelector('#type');
const price = document.querySelector('#price');
const adress = document.querySelector('[name="address"]');
const timein = document.querySelector('#timein');
const timeout = document.querySelector('#timeout');

//Запрет редактирования поля "адрес"
adress.setAttribute('disabled', 'disabled');

//Установка минимальных значений для поля "цена"                              // внимание!!! работает не до конца
type.addEventListener('change', () => {
  price.min = MIN_PRICE[type.value];
  price.placeholder = MIN_PRICE[type.value];
})

//Корректировка значений полей "заезд"/"выезд"
timein.addEventListener('change', () => {
  timeout.value = timein.value;
})

timeout.addEventListener('change', () => {
  timein.value = timeout.value;
})
