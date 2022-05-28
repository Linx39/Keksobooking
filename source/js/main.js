/* global _:readonly */

import { loadMap, renderPopups} from './map.js';
import { getData } from './api.js';
import { setUserFormSubmit } from './user-form.js';
import { showAlert } from './util.js';
import { onFormMapFiltersChange} from './filters.js';

const RERENDER_DELAY = 500;

const loadPopup = ()=> {
  getData((cards) => {
    renderPopups(cards);
    onFormMapFiltersChange(_.debounce(() => renderPopups(cards), RERENDER_DELAY));
  },
  (error) => showAlert(`Упс... Ошибка загрузки данных... ${error}`),
  )
};

loadMap(loadPopup);

setUserFormSubmit();
