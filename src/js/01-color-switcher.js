const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const body = document.querySelector('body');
let interval = 0;


startBtn.addEventListener('click', onStartButton);
stopBtn.addEventListener('click', onStopButton);


function onStartButton() {
    startBtn.disabled = true;

    interval = setInterval(() =>
        body.style.backgroundColor = getRandomHexColor(), 1000);
}

function onStopButton() {
    startBtn.disabled = false;
    clearInterval(interval);
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}
