const typeRus = {
  'bungalow': 'Бунгало',
  'flat': 'Квартира',
  'house': 'Дом',
  'palace': 'Дворец',
};

//Создание попапа с объявлением
const createCostumPopup = ({author: {avatar}, offer: {title, address, price, type, rooms, guests, checkin, checkout, features, description, photos} }) => {
  const templatePopup = document.querySelector('#card').content.querySelector('.popup');
  const cardElement = templatePopup.cloneNode(true);

  cardElement.querySelector('.popup__title').textContent = title;
  cardElement.querySelector('.popup__text--address').textContent = address;
  cardElement.querySelector('.popup__text--price').textContent = `${price} ₽/ночь`;
  cardElement.querySelector('.popup__type ').textContent = typeRus[type];

  cardElement.querySelector('.popup__text--capacity').textContent = `${rooms} комнаты для ${guests} гостей`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${checkin} выезд до ${checkout}`;

  if (features) {
    const popupFeatures = cardElement.querySelector('.popup__features');
    while (popupFeatures.firstChild) {
      popupFeatures.removeChild(popupFeatures.firstChild);
    }
    const fragmentFeatures = document.createDocumentFragment();
    features.forEach((feature) => {
      const featureElement = document.createElement('li');
      const classFeutureElement = `popup__feature--${feature}`;
      featureElement.classList.add('popup__feature');
      featureElement.classList.add(classFeutureElement);
      fragmentFeatures.appendChild(featureElement);
    });
    popupFeatures.appendChild(fragmentFeatures);
  }

  cardElement.querySelector('.popup__description').textContent = description;
  
  const popupPhotos = cardElement.querySelector('.popup__photos');
  const imageElement = popupPhotos.querySelector('.popup__photo');
  popupPhotos.removeChild(imageElement);
  if (photos) {
    const fragmentPhotos = document.createDocumentFragment();
    photos.forEach((photo) => {
      const photoElement = imageElement.cloneNode(true);
      photoElement.src = photo;
      fragmentPhotos.appendChild(photoElement);
    })
    popupPhotos.appendChild(fragmentPhotos);
  }

  if (avatar) {
    cardElement.querySelector('.popup__avatar').src = avatar;
  }

  return cardElement;
}

export { createCostumPopup };
