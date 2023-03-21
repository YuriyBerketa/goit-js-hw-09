import flatpickr from "flatpickr"
import "flatpickr/dist/flatpickr.min.css";

import { Notify } from 'notiflix/build/notiflix-notify-aio'; 
 







// const refs = {
//   btnTimerStart: document.querySelector('[data-start]'),
//   timerFieldDays: document.querySelector('[data-days]'),
//   timerFielHours: document.querySelector('[data-hours]'),
//   timerFieldMinutes: document.querySelector('[data-minutes]'),
//   timerFieldSeconds: document.querySelector('[data-seconds]'),
// };
 
// refs.btnTimerStart.disabled = true;
// let timerId = null;
 
// const options = {
//   enableTime: true,
//   time_24hr: true,
//   defaultDate: new Date(),
//   minuteIncrement: 1,
 
//   onClose(selectedDates) {
//     const currentDate = new Date();
 
//     if (selectedDates[0] - currentDate > 0) {
//       refs.btnTimerStart.disabled = false;
//     } else {
//       refs.btnTimerStart.disabled = true;
//       Notify.failure('Please choose a date in the future', {
//         timeout: 1500,
//         width: '400px',
//       });
//     }
//   },
// };
 
// function convertMs(ms) {
//   const second = 1000;
//   const minute = second * 60;
//   const hour = minute * 60;
//   const day = hour * 24;
 
//   const days = Math.floor(ms / day);
//   const hours = Math.floor((ms % day) / hour);
//   const minutes = Math.floor(((ms % day) % hour) / minute);
//   const seconds = Math.floor((((ms % day) % hour) % minute) / second);
 
//   return { days, hours, minutes, seconds };
// }
 
// function addLeadingZero(value) {
//   return String(value).padStart(2, 0);
// }
 
// function onTimerStart() {
//   const selectedDate = fp.selectedDates[0];
 
//   timerId = setInterval(() => {
//     const startTime = new Date();
//     const countdown = selectedDate - startTime;
//     refs.btnTimerStart.disabled = true;
 
//     if (countdown < 0) {
//       clearInterval(timerId);
//       return;
//     }
//     updateTimerFace(convertMs(countdown));
//   }, 1_000);
// }
 
// function updateTimerFace({ days, hours, minutes, seconds }) {
//   refs.timerFieldDays.textContent = addLeadingZero(days);
//   refs.timerFielHours.textContent = addLeadingZero(hours);
//   refs.timerFieldMinutes.textContent = addLeadingZero(minutes);
//   refs.timerFieldSeconds.textContent = addLeadingZero(seconds);
// }
 
// const fp = flatpickr('#datetime-picker', options);
 
// refs.btnTimerStart.addEventListener('click', onTimerStart);



const btnStartEl = document.querySelector('[data-start]');
const timerDaysEl = document.querySelector('[data-days]');
const timerHoursEl = document.querySelector('[data-hours]');
const timerMintesEl = document.querySelector('[data-minutes]');
const timerSecondsEl = document.querySelector('[data-seconds]');

btnStartEl.disabled = true;
const timeSetInterval = 1000;
let timerTd = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    const currentDate = new Date();
    if (selectedDates - currentDate > 0) {
      btnStartEl.disabled = false;
    } else {
      btnStartEl.disabled = true;
      window.alert("Please choose a date in the future");
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
  const selectDate = fp.selectedDates[0];

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

function updateTimer({ days, hours, minutes, seconds }) {
  timerDaysEl.textContent = convertMs(days);
  timerHoursEl.textContent = convertMs(hours);
  timerMintesEl.textContent = convertMs(minutes);
  timerSecondsEl.textContent = convertMs(seconds);
}