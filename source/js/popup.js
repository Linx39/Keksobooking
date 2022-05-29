import { getDeclination } from './util.js';

const roomsDeclination = ['комната', 'комнаты', 'комнат'];
const guestsDeclination = ['гостя', 'гостей', 'гостей'];

const typeRus = {
  bungalow: 'Бунгало',
  flat: 'Квартира',
  house: 'Дом',
  palace: 'Дворец',
};

const templatePopup = document.querySelector('#card').content.querySelector('.popup');

//Создание попапа с объявлением
const createCustomPopup = ({author, offer}) => {
  const {avatar} = author;
  const {
    title,
    address,
    price,
    type,
    rooms,
    guests,
    checkin,
    checkout,
    features,
    description,
    photos,
  } = offer;

  const cardElement = templatePopup.cloneNode(true);

  const createPopupFeatures = () => {
    const popupFeatures = cardElement.querySelector('.popup__features');
    if (features) {
      while (popupFeatures.firstChild) {
        popupFeatures.removeChild(popupFeatures.firstChild);
      }

      features.forEach((feature) => {
        const featureElement = document.createElement('li');
        const classFeutureElement = `popup__feature--${feature}`;
        featureElement.classList.add('popup__feature');
        featureElement.classList.add(classFeutureElement);
        popupFeatures.appendChild(featureElement);
      });
    }

    if (!features) {
      popupFeatures.remove();
    }
  };

  const createPopupDescription = () => {
    const popupDescription = cardElement.querySelector('.popup__description')
    if (description) {
      popupDescription.textContent = description;
    }

    if (!description) {
      popupDescription.remove();
    }
  };

  const createPopupPhotos = () => {
    const popupPhotos = cardElement.querySelector('.popup__photos');
    const imageElement = popupPhotos.querySelector('.popup__photo');
    popupPhotos.removeChild(imageElement);
    if (photos) {
      photos.forEach((photo) => {
        const photoElement = imageElement.cloneNode(true);
        photoElement.src = photo;
        popupPhotos.appendChild(photoElement);
      })
    }

    if (!photos) {
      popupPhotos.remove();
    }
  };

  const createPopupAvatar = () => {
    const popupAvatar = cardElement.querySelector('.popup__avatar');
    if (avatar) {
      popupAvatar.src = avatar;
    }

    if (!avatar) {
      popupAvatar.remove();
    }
  };

  cardElement.querySelector('.popup__title').textContent = title;
  cardElement.querySelector('.popup__text--address').textContent = address;
  cardElement.querySelector('.popup__text--price').textContent = `${price} ₽/ночь`;
  cardElement.querySelector('.popup__type ').textContent = typeRus[type];
  cardElement.querySelector('.popup__text--capacity').textContent = `${rooms} ${getDeclination(rooms, roomsDeclination)} для ${guests} ${getDeclination(guests, guestsDeclination)}`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${checkin} выезд до ${checkout}`;
  createPopupFeatures();
  createPopupDescription();
  createPopupPhotos();
  createPopupAvatar();

  return cardElement;
};

export { createCustomPopup };
