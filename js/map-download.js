/* global L:readonly */

import { formDisabled, formEnabled } from './util.js';
// import { createAdvertisements } from './data.js';

const Center = {
  LAT: 35.68950,
  LNG: 139.69171,
}

const TYPE_RUS = {
  'bungalow': 'Бунгало',
  'flat': 'Квартира',
  'house': 'Дом',
  'palace': 'Дворец',
};

const address = document.querySelector('[name="address"]');

//Деактивация страницы до загрузки карты
formDisabled();

//Загрузка карты
const map = L.map('map-canvas')
  .on('load', () => {
    formEnabled();
    address.value = `${Center.LAT}, ${Center.LNG}`;
  })
  .setView({
    lat: Center.LAT,
    lng: Center.LNG,
  }, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

//Добавление главной метки
const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const marker = L.marker(
  {
    lat: Center.LAT,
    lng: Center.LNG,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

marker.addTo(map);

marker.on('moveend', (evt) => {
  const markerLatLng = evt.target.getLatLng();
  address.value = `${markerLatLng.lat.toFixed(5)}, ${markerLatLng.lng.toFixed(5)}`;
});

//Добавление меток объявлений
const pinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

// const popups = createAdvertisements();
const renderPopups = (popups) => {
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

  popups.forEach ((popup) => {
    const marker = L.marker({
      lat: popup.location.lat,
      lng: popup.location.lng,
    },
    {
      icon: pinIcon,
    });

    marker
      .addTo(map)
      .bindPopup(
        createCostumPopup(popup),
        {
          keepInView: true,
        });
  })
}

export { renderPopups };