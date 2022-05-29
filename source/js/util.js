const ALERT_SHOW_TIME = 5000;

//Функция перехвата события нажатия клавиши ESC
const isEscEvent = (evt) => {
  return evt.key === 'Escape' || evt.key === 'Esc';
};

//Функция проверки статуса запроса
const checkStatus = (response) => {
  if (response.ok) {
    return response;
  }

  throw new Error(`${response.status} — ${response.statusText}`);
};

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'white';
  alertContainer.style.borderColor = 'red';
  alertContainer.style.borderWidth = '5px';
  alertContainer.style.borderStyle = 'dashed';
  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const getDeclination = (number, txt, cases = [2, 0, 1, 1, 1, 2]) => txt[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];

export { isEscEvent, checkStatus, showAlert, getDeclination};
