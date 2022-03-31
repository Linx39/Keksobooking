const MIN_PRICE ={
  'bungalow': 0,
  'flat': 1000,
  'house': 5000,
  'palace': 10000,
}

const type = document.querySelector('#type');
const price = document.querySelector('#price');

//работает не до конца
type.addEventListener('change', () => {
  price.min = MIN_PRICE[type.value];
  price.placeholder = MIN_PRICE[type.value];
})

const timein = document.querySelector('#timein');
const timeout = document.querySelector('#timeout');

timein.addEventListener('change', () => {
  timeout.value = timein.value;
})

timeout.addEventListener('change', () => {
  timein.value = timeout.value;
})