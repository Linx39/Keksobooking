const TYPE_RUS = {
  'bungalow': 'Бунгало',
  'flat': 'Квартира',
  'house': 'Дом',
  'palace': 'Дворец',
};

//Создание попапа с объявлением
const createCostumPopup = (card) => {
  const templatePopup = document.querySelector('#card').content.querySelector('.popup');
  const cardElement = templatePopup.cloneNode(true);

  cardElement.querySelector('.popup__title').textContent = card.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = `${card.offer.price} ₽/ночь`;
  cardElement.querySelector('.popup__type ').textContent = TYPE_RUS[card.offer.type];

  cardElement.querySelector('.popup__text--capacity').textContent = `${card.offer.rooms} комнаты для ${card.offer.guests} гостей`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${card.offer.checkin} выезд до ${card.offer.checkout}`;

  if (card.offer.features) {
    const popupFeatures = cardElement.querySelector('.popup__features');
    while (popupFeatures.firstChild) {
      popupFeatures.removeChild(popupFeatures.firstChild);
    }
    const fragmentFeatures = document.createDocumentFragment();
    card.offer.features.forEach((feature) => {
      const featureElement = document.createElement('li');
      const classFeutureElement = `popup__feature--${feature}`;
      featureElement.classList.add('popup__feature');
      featureElement.classList.add(classFeutureElement);
      fragmentFeatures.appendChild(featureElement);
    });
    popupFeatures.appendChild(fragmentFeatures);
  }

  cardElement.querySelector('.popup__description').textContent = card.offer.description;

  if (card.offer.photos) {
    const popupPhotos = cardElement.querySelector('.popup__photos');
    const imageElement = popupPhotos.querySelector('.popup__photo');
    popupPhotos.removeChild(imageElement);
    const fragmentPhotos = document.createDocumentFragment();
    card.offer.photos.forEach((photo) => {
      const photoElement = imageElement.cloneNode(true);
      photoElement.src = photo;
      fragmentPhotos.appendChild(photoElement);
    })
    popupPhotos.appendChild(fragmentPhotos);
  }

  cardElement.querySelector('.popup__avatar').src = card.author.avatar;

  return cardElement;
}

export { createCostumPopup }