import { createAdvertisements } from './data.js';

const TYPE_RUS = {
  'bungalow': 'Бунгало',
  'flat': 'Квартира',
  'house': 'Дом',
  'palace': 'Дворец',
};

const mapCanvas = document.querySelector('.map__canvas');
const templatePopup = document.querySelector('#card').content.querySelector('.popup');

const fragment = document.createDocumentFragment();
const advertisements = createAdvertisements();

advertisements.forEach((card) => {
  const cardElement = templatePopup.cloneNode(true);
  const cardOffer = card.offer;

  cardElement.querySelector('.popup__title').textContent = cardOffer.title;
  cardElement.querySelector('.popup__text--address').textContent = cardOffer.address;
  cardElement.querySelector('.popup__text--price').textContent = `${cardOffer.price} ₽/ночь`;
  cardElement.querySelector('.popup__type ').textContent = TYPE_RUS[cardOffer.type];

  cardElement.querySelector('.popup__text--capacity').textContent = `${cardOffer.rooms} комнаты для ${cardOffer.guests} гостей`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${cardOffer.checkin} выезд до ${cardOffer.checkout}`;

  const popupFeatures = cardElement.querySelector('.popup__features');
  while (popupFeatures.firstChild) {
    popupFeatures.removeChild(popupFeatures.firstChild);
  }
  const fragmentFeatures = document.createDocumentFragment();
  cardOffer.features.forEach((feature) => {
    const featureElement = document.createElement('li');
    const classFeutureElement = `popup__feature--${feature}`;
    featureElement.classList.add('popup__feature');
    featureElement.classList.add(classFeutureElement);
    fragmentFeatures.appendChild(featureElement);
  });
  popupFeatures.appendChild(fragmentFeatures);

  cardElement.querySelector('.popup__description').textContent = cardOffer.description;

  const popupPhotos = cardElement.querySelector('.popup__photos');
  const imageElement = popupPhotos.querySelector('.popup__photo');
  popupPhotos.removeChild(imageElement);
  const fragmentPhotos = document.createDocumentFragment();
  cardOffer.photos.forEach((photo) => {
    const photoElement = imageElement.cloneNode(true);
    photoElement.src = photo;
    fragmentPhotos.appendChild(photoElement);
  })
  popupPhotos.appendChild(fragmentPhotos);

  cardElement.querySelector('.popup__avatar').src = card.author.avatar;

  fragment.appendChild(cardElement);
});

// mapCanvas.appendChild(fragment.children[0]);
