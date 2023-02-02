"use strict"
//! Получаем индикаторы
const blackIndicators = document.querySelectorAll('.indicator_black');
const redIndicators = document.querySelectorAll('.indicator_red');
const yellowIndicators = document.querySelectorAll('.indicator_yellow');
const greenIndicator = document.querySelector('.indicator_green');
//!====================
const button = document.querySelector('.button');
button.addEventListener("click", resetIndicatorStyles);
button.addEventListener("click", runGame);
button.addEventListener("click", decorateIndicators);

const newGameButton = document.querySelector('.new-number-button');
newGameButton.addEventListener("click", newGame);

const lifesBlock = document.querySelector('.lifes-count');
let userNumber; //! Вводимое число
//! Рандомайзер
let secretNumber = Math.trunc(Math.random() * 9) + 1;
console.log(`Загаданное число = ${secretNumber}`);
//!=========
let attempt = 0; //? Количество попыток
let lifes = 5; //? Шансы
lifesBlock.innerHTML = `Количество попыток: ${lifes}`;
//! Начать заново
function newGame() {
    location.reload();
} //!=========

function resetIndicatorStyles() {
    //!Обнуление стилей индикаторов
    blackIndicators.forEach(blackCircles => {
        blackCircles.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
        blackCircles.innerHTML = "";
    });
    redIndicators.forEach(redCircles => {
        redCircles.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
        redCircles.innerHTML = "";
    });
    yellowIndicators.forEach(yellowCircles => {
        yellowCircles.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
        yellowCircles.innerHTML = "";
    });
    greenIndicator.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
    greenIndicator.innerHTML = "";
    //!=============================
}

function runGame() {
    //! Проверка введённого значения на правильность
    do {
        userNumber = prompt("Введите число от 1 до 9:");
        if (userNumber >= 1 && userNumber <= 9) {
            Number(userNumber);
        } else {
            alert("Введите число от 1 до 9!");
        }
    } while (userNumber < 1 || userNumber > 9);
    //!================================
    attempt++;
    if (lifes == 0) {
        alert("У вас не осталось попыток :(");
        lifesBlock.style.backgroundColor = "rgba(255, 0, 0, 0.2)"
        button.disabled = true;
    }
    if (userNumber == secretNumber) {
        button.style.display = "none";
        lifesBlock.style.display = "none";
        greenIndicator.style.backgroundColor = "rgba(1, 198, 1, 0.8)";
        greenIndicator.innerHTML = `Вы угадали! Количество потраченных попыток: ${attempt}`;
    } else if (userNumber != secretNumber) {
        lifes--;
        lifesBlock.innerHTML = `Попыток осталось: ${lifes + 1}`;
    }
}

function decorateIndicators() {
    let difference = Math.abs(secretNumber - userNumber);
    if (difference >= 3) {
        //todo Холодно
        blackIndicators.forEach(blackCircles => {
            blackCircles.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
            blackCircles.innerHTML = "Холодно :(";
        });
    } else if (difference == 2) {
        //todo Близко
        redIndicators.forEach(redCircles => {
            redCircles.style.backgroundColor = "rgba(255, 0, 0, 0.8)";
            redCircles.innerHTML = "Близко :)";
        });
    } else if (difference == 1) {
        //todo Горячо
        yellowIndicators.forEach(yellowCircles => {
            yellowCircles.style.backgroundColor = "rgba(255, 255, 0, 0.8)";
            yellowCircles.innerHTML = "Горячо :D";
        });
    };
}