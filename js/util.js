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
  return new Array(getRandomInteger(1, arrayValues.length)).fill(null).map((currentValue, index, array) => {
    let valuesNew = arrayValues[getRandomInteger(0, arrayValues.length-1)];
    if (array.some((element) => {return element === valuesNew}) === false) {
      return valuesNew;
    }
  },
  );
};

export { getRandomInteger, getRandom, getRandomArrayElement, getRandomArrayFromArray };
