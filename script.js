const showTime = document.querySelector("#time__show");

const time = {
    minutes: 0,
    seconds: 0,
    showTime: function () {
        let timeElement = document.querySelector("#time__show");
        timeElement.innerHTML = `${this.minutes} : ${this.seconds}`;
        if (this.seconds < 10) {
            timeElement.innerHTML = `${this.minutes} : 0${this.seconds}`;
        }
        this.changeTime();
    },
    changeTime: function () {
        this.timeId = setTimeout(() => {
            clearTimeout(this.timeId);
            this.seconds--;
            this.showTime();
            // Reset seconds to 59 if there's still minutes left
            if (this.minutes > 0 && this.seconds === 0) {
                this.minutes--;
                this.seconds = 59;
            }
            if (this.seconds === 0 && this.minutes === 0) {
                clearTimeout(this.timeId);
                const bomb = document.querySelector("#app__bomb");
                bomb.style.animation = "none";
            }
            // Show bomb animation on the last seconds
            if (this.minutes === 0 && this.seconds === 5) {
                this.animateBomb();
            }
            // Play bomb countdown sound
            if (this.minutes === 0 && this.seconds === 3) {
                const bombCountdown = new Audio("./bomb-countdown.mp3");
                bombCountdown.play();
            }
            // Play bomb sound
            if (this.minutes === 0 && this.seconds === 1) {
                const bombSound = new Audio("./bomb-sound.mp3");
                bombSound.play();
            }
        }, 1000);
    },
    animateBomb: function () {
        const bomb = document.querySelector("#app__bomb");
        bomb.style.animation = "bomb-pulsate ease-in-out 5s";
        console.log(bomb);
    },
};

const startBtn = document.querySelector("#time__start-btn").addEventListener("click", inputTime);

function inputTime() {
    const inputMinutes = Number(document.querySelector("#time__input--minutes").value);
    const inputSeconds = Number(document.querySelector("#time__input--seconds").value);
    time.minutes = inputMinutes;
    time.seconds = inputSeconds;
    if (!inputMinutes && !inputSeconds) {
        return false;
    }
    time.showTime();
}

document.body.addEventListener("click", chooseTime);
function chooseTime(e) {
    if (e.target.id === "time__minutes--half") {
        time.minutes = 0;
        time.seconds = 29;
        time.showTime();
    }
    if (e.target.id === "time__minutes--half") {
        time.minutes = 0;
        time.seconds = 29;
        time.showTime();
    }
    if (e.target.id === "time__minutes--one") {
        time.minutes = 0;
        time.seconds = 59;
        time.showTime();
    }
    if (e.target.id === "time__minutes--two") {
        time.minutes = 1;
        time.seconds = 59;
        time.showTime();
    }
    console.log(e.target);
}
