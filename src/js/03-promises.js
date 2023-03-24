const form = document.querySelector('form');

let startAmount = 0;
let delay = 0;
let step = 0;
let amount = 0;
let promiseDelay = 0;
let startDelay = 0;

form.addEventListener('submit', onFormSubmit);



function onFormSubmit (event) {
  event.preventDefault();
  amount = form.amount.valueAsNumber;
  delay = form.delay.valueAsNumber;
  step = form.step.valueAsNumber;
  startAmount = 0;
  startDelay = delay;

  for (let i = 0; i < amount; i += 1) {
    startAmount += 1;
    if (i > 0) {
      startDelay += step;
    }

    createPromise(startAmount, startDelay)
    .then(({ position, delay }) => {
      console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      console.log(`❌ Rejected promise ${position} in ${delay}ms`);
    });
  }
}

function createPromise(position, delay) {
    return new Promise ((resolve, reject) => {

      setTimeout (()=> {
        const shouldResolve = Math.random() > 0.3;
        if (shouldResolve) {  //> 0.3;
          // Fulfill
          resolve({'position': position, 'delay': delay});
        } else {
          // Reject
          reject({'position': position, 'delay': delay});
        }   
      }, delay);

    });  
}

