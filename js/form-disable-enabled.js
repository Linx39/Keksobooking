const formDisabled = () => {
  const elementDisabled = (form, field) => {
    const formFields = form.querySelectorAll(field);

    for (let element of formFields) {
      element.setAttribute('disabled', 'disabled');
    }
  }
  const adForm = document.querySelector('.ad-form');
  adForm.classList.add('ad-form--disabled');

  elementDisabled(adForm, 'fieldset')

  const mapFilters = document.querySelector('.map__filters');
  mapFilters.classList.add('map__filters--disabled');

  elementDisabled(mapFilters, 'fieldset');
  elementDisabled(mapFilters, 'select');
}


const formEnabled = () => {
  const elementEnabled = (form, field) => {
    const formFields = form.querySelectorAll(field);

    for (let element of formFields) {
      element.removeAttribute('disabled');
    }
  }
  const adForm = document.querySelector('.ad-form');
  adForm.classList.remove('ad-form--disabled');

  elementEnabled(adForm, 'fieldset')

  const mapFilters = document.querySelector('.map__filters');
  mapFilters.classList.remove('map__filters--disabled');

  elementEnabled(mapFilters, 'fieldset');
  elementEnabled(mapFilters, 'select');
}

export { formDisabled, formEnabled }
