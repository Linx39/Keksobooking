import { getRandomInteger, getRandom, getRandomArrayElement, getRandomArrayFromArray } from './util.js';

//Константы
const NUMBER_AUTHORS = 10;
const NUMBER_ADVERTISEMENT = 10;
const Price = {
  MIN: 1,
  MAX: 10000,
};
const MAX_ROOMS = 20;
const MAX_GUESTS = 20;
const Latitude = {
  MIN: 35.65000,
  MAX: 35.70000,
};
const Longitude = {
  MIN: 139.70000,
  MAX: 139.80000,
};

//Создание массива авторов
const authors = new Array(NUMBER_AUTHORS).fill(null).map((curentValue, i) => {
  let imageIndex = (String(i+1).length === 1) ? ('0' + (i + 1)) : (i + 1);
  return {
    avatar: 'img/avatars/user' + imageIndex + '.png',
  }
})

//Массивы значений для создания объекта offer
const titles = ['Суперпредложение!', 'Роскошные аппартаменты', 'Скидка только сегодня!', 'Дёшево и сердито', 'Скромно, но с вкусом']
const types = ['palace', 'flat', 'house', 'bungalow'];
const checkins = ['12:00', '13:00', '14:00'];
const checkouts = ['12:00', '13:00', '14:00'];
const featuresValues = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const descriptions = ['Тараканов нет.', 'Шампанское каждому гостю!', 'Внимание! Лифт временно не работает!', 'Удобства на улице.'];
const photosValues = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

//Функция создания случайного объявления
const createAdvertisement = () => {
  let advertisement = {
    author: getRandomArrayElement(authors),

    offer: {
      title: getRandomArrayElement(titles),
      address: '',
      price: getRandomInteger(Price.MIN, Price.MAX),
      type: getRandomArrayElement(types),
      rooms: getRandomInteger(1, MAX_ROOMS),
      guests: getRandomInteger(1, MAX_GUESTS),
      checkin: getRandomArrayElement(checkins),
      checkout: getRandomArrayElement(checkouts),
      features: getRandomArrayFromArray(featuresValues),
      description: getRandomArrayElement(descriptions),
      photos: getRandomArrayFromArray(photosValues)},

    location: {
      x: getRandom(Latitude.MIN, Latitude.MAX, 5),
      y: getRandom(Longitude.MIN, Longitude.MAX, 5),
    },
  }

  advertisement.offer.address = advertisement.location.x + ', ' + advertisement.location.y;

  return advertisement;

};

//Создание массива объявлений
const createAdvertisements = () => new Array(NUMBER_ADVERTISEMENT).fill(null).map(() => createAdvertisement());

export { createAdvertisements };