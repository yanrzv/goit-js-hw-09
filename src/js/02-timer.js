import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const pickerInput = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const daysMarkup = document.querySelector('[data-days]');
const hoursMarkup = document.querySelector('[data-hours]');
const minutesMarkup = document.querySelector('[data-minutes]');
const secondsMarkup = document.querySelector('[data-seconds]');
let selectedUnixDate = 0;


const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      selectedUnixDate = selectedDates[0].getTime();
      onSelectedDate();
      return selectedUnixDate;
    },
  };

flatpickr(pickerInput, options);

startBtn.disabled = true;
startBtn.addEventListener('click', () => {
    setInterval(timeCounter, 1000);   
})


function onSelectedDate() {
    if(selectedUnixDate < Date.now()) {
        alert('Please choose a date in the future');
    } else {
        startBtn.disabled = false;
    }   
}

function timeCounter() {
    convertMs(selectedUnixDate - Date.now()) 
}

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

    daysMarkup.textContent = addLeadingZero(days);
    hoursMarkup.textContent = addLeadingZero(hours);
    minutesMarkup.textContent = addLeadingZero(minutes);
    secondsMarkup.textContent = addLeadingZero(seconds);
  
    return { days, hours, minutes, seconds };
  }
  
  
  function addLeadingZero(value) {
    return String(value).padStart(2, '0')
  }