const BtnStartEl = document.querySelector('button[data-start]');
const BtnStopEl = document.querySelector('button[data-stop]');
const bodyEl = document.body;
let timerId = null;

BtnStartEl.addEventListener('click', onBtnStart);
BtnStopEl.addEventListener('click', onBtnStop);

function onBtnStart () {
    timerId = setInterval(() => {
        bodyEl.style.backgroundColor = getRandomHexColor();
        BtnStartEl.disabled = true;
    }, 1000);
}

function onBtnStop() {
    clearInterval(timerId);
    BtnStartEl.disabled = false;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}