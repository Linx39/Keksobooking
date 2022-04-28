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
};

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

//Функция перехвата события нажатия клавиши ESC
const isEscEvent = (evt) => {
  return evt.key === 'Escape' || evt.key === 'Esc';
};

//Функция проверки статуса запроса
const checkStatus = (response) => {
  if (response.ok) {
    return response;
  }

  throw new Error(`${response.status} — ${response.statusText}`);
};

export { getRandomInteger, getRandom, getRandomArrayElement, getRandomArrayFromArray, isEscEvent, checkStatus };
