import flatpickr from "flatpickr"
import "flatpickr/dist/flatpickr.min.css";

import { Notify } from 'notiflix/build/notiflix-notify-aio'; 
 

const btnStartEl = document.querySelector('[data-start]');
const timerDaysEl = document.querySelector('[data-days]');
const timerHoursEl = document.querySelector('[data-hours]');
const timerMintesEl = document.querySelector('[data-minutes]');
const timerSecondsEl = document.querySelector('[data-seconds]');

btnStartEl.disabled = true;
const timeSetInterval = 1000;
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    const currentDate = new Date();
    if (selectedDates[0] > currentDate) {
      btnStartEl.disabled = false;
    } else {
      btnStartEl.disabled = true;
      // window.alert("Please choose a date in the future");
      Notify.failure('Please choose a date in the future');
    }
  },
};


function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}


function onTimerStart() {
  const selectDate = fpEl.selectedDates[0];

  timerId = setInterval(() => {
    const startDate = new Date();
    const differenceDate = selectDate - startDate;
    btnStartEl.disabled = true;

    if (differenceDate < 0) {
      clearInterval(timerId);
      return;
    }
    updateTimer(convertMs(differenceDate));
  }, timeSetInterval);
}

function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}

function updateTimer({ days, hours, minutes, seconds }) {
  timerDaysEl.textContent = addLeadingZero(days);
  timerHoursEl.textContent = addLeadingZero(hours);
  timerMintesEl.textContent = addLeadingZero(minutes);
  timerSecondsEl.textContent = addLeadingZero(seconds);
};

const fpEl = flatpickr('#datetime-picker', options);
btnStartEl.addEventListener('click', onTimerStart);