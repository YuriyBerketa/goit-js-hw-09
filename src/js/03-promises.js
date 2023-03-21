import Notiflix, { Notify } from 'notiflix';

const formEl = document.querySelector('.form');

formEl.addEventListener('submit', onFormSubmit);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onFormSubmit(evt) {
  evt.preventDefault();
  
  const formData = new FormData(evt.currentTarget);
  const dataParametrs = {};

  for (const [key, value] of formData.entries()) {
    dataParametrs[key] = Number(value);
  }

  let { amount, step, delay } = dataParametrs;

  for (let i = 1; i <= amount; i +=1) {
    delay += step;
    createPromise(i, delay).then(onSuccsess).catch(onError);

      formEl.reset();
  }
}

function onSuccsess({ position, delay }) {
    Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
}
  
function onError({ position, delay }) {
   Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  }
// formEl.addEventListener('submit', onFormSubmit);
