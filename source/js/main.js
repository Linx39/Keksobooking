/* global _:readonly */

import { loadMap, renderPopups} from './map.js';
import { getData } from './api.js';
import { setUserFormSubmit } from './user-form.js';
import { showAlert } from './util.js';
import { 
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
} from './filters.js';

const RERENDER_DELAY = 500;

const loadPopup = ()=> {
  getData((cards) => {
    renderPopups(cards);
    // onHousingTypeChange(_.debounce(() => renderPopups(cards), RERENDER_DELAY));
    // onHousingPriceChange(_.debounce(() => renderPopups(cards), RERENDER_DELAY));
    // onHousingRoomsChange(_.debounce(() => renderPopups(cards), RERENDER_DELAY));
    // onHousingGuestsChange(_.debounce(() => renderPopups(cards), RERENDER_DELAY));
    // onFilterWifiClick(_.debounce(() => renderPopups(cards), RERENDER_DELAY));
    // onFilterDishwasherClick(_.debounce(() => renderPopups(cards), RERENDER_DELAY));
    // onFilterParkingClick(_.debounce(() => renderPopups(cards), RERENDER_DELAY));
    // onFilterWasherClick(_.debounce(() => renderPopups(cards), RERENDER_DELAY));
    // onFilterElevatorClick(_.debounce(() => renderPopups(cards), RERENDER_DELAY));
    // onFilterConditionerClick(_.debounce(() => renderPopups(cards), RERENDER_DELAY));
    onFormMapFiltersChange(_.debounce(() => renderPopups(cards), RERENDER_DELAY));
  },
  (error) => showAlert(`Упс... Ошибка загрузки данных... ${error}`),
  )
};

loadMap(loadPopup);

setUserFormSubmit();
