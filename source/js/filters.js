const Default_Value = {
  HOUSING_TYPE: 'any',
  HOUSING_PRICE: 'any',
  HOUSING_ROOMS: 'any',
  HOUSING_GUEST: 'any',
};

const Price_Rank = {
  LOW: ['low', 10000],
  MIDDLE: ['middle', 50000],
  HIGH: ['high'],
};

const mapFilters = document.querySelector('.map__filters');
const housingType = mapFilters.querySelector('#housing-type');
const housingPrice = mapFilters.querySelector('#housing-price');
const housingRooms = mapFilters.querySelector('#housing-rooms');
const housingGuests = mapFilters.querySelector('#housing-guests');
const filterFeatures = mapFilters.querySelectorAll('input[type="checkbox"]');

//Функция, отслеживающая изменения фильтров
const onFormMapFiltersChange = (cb) => {
  mapFilters.addEventListener('change', () => cb());
};

//Функция, определяющая правила фильтрация попапов
const filterPopup = ({offer}) => {
  const {price, type, rooms, guests, features} = offer;

  //Функция, возращающая значение поля выбора цены
  const priceValue = () => {
    if (price < Price_Rank.LOW[1]) {
      return Price_Rank.LOW[0];
    }
    if (price >= Price_Rank.LOW[1] && price <= Price_Rank.MIDDLE[1]) {
      return Price_Rank.MIDDLE[0];
    }
    if (price > Price_Rank.MIDDLE[1]) {
      return Price_Rank.HIGH[0];
    }
  };

  //Функции, проверяющая выбор значений для фильтра
  const isFilterType = () => housingType.value === Default_Value.HOUSING_TYPE || housingType.value === type;
  const isFilterPrice = () => housingPrice.value === Default_Value.HOUSING_PRICE || housingPrice.value === priceValue();
  const isFilterRooms = () => housingRooms.value === Default_Value.HOUSING_ROOMS || housingRooms.value === String(rooms);
  const isFilterGuests = () => housingGuests.value === Default_Value.HOUSING_GUEST || housingGuests.value === String(guests);

  const isFilterFeatures = () => {
    let isFilter = true;

    filterFeatures.forEach(filterElement => {
      let isElement = true;
      if (Array.isArray(features)) {
        isElement = features.some(element => filterElement.value === element);
      }

      const isFilterElement = filterElement.checked && isElement || !filterElement.checked;

      isFilter =  isFilter && isFilterElement;
    });

    return isFilter;
  };

  return isFilterType()
      && isFilterPrice()
      && isFilterRooms()
      && isFilterGuests()
      && isFilterFeatures();
};

export { filterPopup, onFormMapFiltersChange };
