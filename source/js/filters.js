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
const filterWifi = mapFilters.querySelector('#filter-wifi');
const filterDishwasher = mapFilters.querySelector('#filter-dishwasher');
const filterParking = mapFilters.querySelector('#filter-parking');
const filterWasher = mapFilters.querySelector('#filter-washer');
const filterElevator = mapFilters.querySelector('#filter-elevator');
const filterConditioner = mapFilters.querySelector('#filter-conditioner');

const onFormMapFiltersChange = (cb) => {
  mapFilters.addEventListener('change', (evt) => {
    console.log(evt.target);
    cb();
  });
};


//Функции, отслеживающие изменения фильтров
// const onHousingTypeChange = (cb) => {
//   housingType.addEventListener('change', () => cb())
// };

// const onHousingPriceChange = (cb) => {
//   housingPrice.addEventListener('change', () => cb())
// };

// const onHousingRoomsChange = (cb) => {
//   housingRooms.addEventListener('change', () => cb())
// };

// const onHousingGuestsChange = (cb) => {
//   housingGuests.addEventListener('change', () => cb())
// };

// const onFilterWifiClick = (cb) => {
//   filterWifi.addEventListener('click', () => cb())
// };

// const onFilterDishwasherClick  = (cb) => {
//   filterDishwasher.addEventListener('click', () => cb())
// };

// const onFilterParkingClick  = (cb) => {
//   filterParking.addEventListener('click', () => cb())
// };

// const onFilterWasherClick  = (cb) => {
//   filterWasher.addEventListener('click', () => cb())
// };

// const onFilterElevatorClick  = (cb) => {
//   filterElevator.addEventListener('click', () => cb())
// };

// const onFilterConditionerClick  = (cb) => {
//   filterConditioner.addEventListener('click', () => cb())
// };

//Функция, определяющая правила фильтрация попапов
const filterPopup = ({offer}) => {
  const {price, type, rooms, guests, features} = offer;

  const isHousingType = housingType.value === Default_Value.HOUSING_TYPE || housingType.value === type;

  let priceValue;
  if (price < Price_Rank.LOW[1]) {
    priceValue = Price_Rank.LOW[0];
  }
  if (price >= Price_Rank.LOW[1] && price <= Price_Rank.MIDDLE[1]) {
    priceValue = Price_Rank.MIDDLE[0];
  }
  if (price > Price_Rank.MIDDLE[1]) {
    priceValue = Price_Rank.HIGH[0];
  }
  const isHousingPrice = housingPrice.value === Default_Value.HOUSING_PRICE || housingPrice.value === priceValue;

  const isHousingRooms = housingRooms.value === Default_Value.HOUSING_ROOMS || housingRooms.value === String(rooms);

  const isHousingGuests = housingGuests.value === Default_Value.HOUSING_GUEST || housingGuests.value === String(guests);

  //Функция, проверяющая выбран ли элемент для фильтра
  const isFilterElement = (filterElement) => {
    let isElement = true;
    if (Array.isArray(features)) {
      isElement = features.some(element => filterElement.value === element);
    }

    return filterElement.checked && isElement || !filterElement.checked;
  };

  const isFilterWifi = isFilterElement(filterWifi);
  const isFilterDishwasher = isFilterElement(filterDishwasher);
  const isFilterParking = isFilterElement(filterParking);
  const isFilterWasher = isFilterElement(filterWasher);
  const isFilterElevator = isFilterElement(filterElevator);
  const isFilterConditioner = isFilterElement(filterConditioner);

  return isHousingType
      && isHousingPrice
      && isHousingRooms 
      && isHousingGuests 
      && isFilterWifi 
      && isFilterDishwasher 
      && isFilterParking 
      && isFilterWasher 
      && isFilterElevator 
      && isFilterConditioner;
};

export { 
  filterPopup,
  // onHousingGuestsChange,
  // onHousingPriceChange,
  // onHousingRoomsChange,
  // onHousingTypeChange,
  // onFilterConditionerClick,
  // onFilterDishwasherClick,
  // onFilterElevatorClick,
  // onFilterParkingClick,
  // onFilterWasherClick,
  // onFilterWifiClick,
  onFormMapFiltersChange
};