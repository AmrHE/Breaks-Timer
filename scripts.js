let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('.timer__button');

function timer(seconds) {
    //Clear any existing timers
    clearInterval(countdown);

    //start a new timer
    const now = Date.now();
    const then = now + (seconds * 1000);
    displayTimeLeft(seconds);
    displayEndTime(then);

    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        //check when to stop it
        if (secondsLeft < 0) {
            clearInterval(countdown);
            return;
        }
        //display it
        displayTimeLeft(secondsLeft);
    }, 1000);
};

function displayTimeLeft(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds / 60) - (hours * 60));
    const remainingSeconds = seconds % 60;
    const display = `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    document.title = display;
    timerDisplay.textContent = display;
}

function displayEndTime(timeStamp) {
    const end = new Date(timeStamp);
    const hour = end.getHours();
    const adjustedHrs = hour > 12 ? hour - 12 : hour;
    const minutes = end.getMinutes();
    endTime.textContent = `Be Back At ${adjustedHrs}:${minutes < 10 ? '0' : ''}${minutes}`;
}

function startTimer() {
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
}



buttons.forEach(button => button.addEventListener('click', startTimer));

//FORM To Be Checked Tomorrow
document.customForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const mins = this.minutes.value;
    const secs = mins * 60;
    this.reset();
    timer(secs);
});