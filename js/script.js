"use strict";

const allIndicators = document.querySelectorAll(".indicator");
const blackIndicators = document.querySelectorAll(".indicator_black");
const redIndicators = document.querySelectorAll(".indicator_red");
const yellowIndicators = document.querySelectorAll(".indicator_yellow");
const greenIndicator = document.querySelector(".indicator_green");
const tryBtn = document.querySelector("#try-btn");
const restartBtn = document.querySelector("#restart-btn");
const lifesBlock = document.querySelector(".lifes-block");

tryBtn.addEventListener("click", runGame);
restartBtn.addEventListener("click", newGame);

let lifesCount = 3;
let attempt = 0;
let lifes = lifesCount;

lifesBlock.innerHTML = `Количество попыток: ${lifesCount}`;

let userNumber;
let secretNumber = Math.trunc(Math.random() * 9) + 1;
console.log(`Загаданное число = ${secretNumber}`);

function newGame() {
  secretNumber = Math.trunc(Math.random() * 9) + 1;
  console.log(`Загаданное число = ${secretNumber}`);
  restartBtn.style.display = "none";
  tryBtn.innerHTML = "Начать игру";

  lifes = lifesCount;
  attempt = 0;
  resetAll();
}

function resetAll() {
  resetIndicatorStyles();
  lifesBlock.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
  lifesBlock.innerHTML = `Количество попыток: ${lifesCount}`;
  tryBtn.style.display = "block";
  tryBtn.disabled = false;
  greenIndicator.innerHTML = "";
}

function resetIndicatorStyles() {
  allIndicators.forEach((eachIndicator) => {
    if (!eachIndicator.classList.contains("_active")) {
      eachIndicator.style.backgroundColor = "white";
      eachIndicator.style.opacity = "0.6";
      eachIndicator.innerHTML = "";
    }
  });
}

function decorateIndicators() {
  let difference = Math.abs(secretNumber - userNumber);

  if (difference >= 3) {
    blackIndicators.forEach((blackInd) => {
      blackInd.style.backgroundColor = "black";
      blackInd.innerHTML = "Холодно :(";
    });
  }

  if (difference === 2) {
    redIndicators.forEach((redInd) => {
      redInd.style.backgroundColor = "red";
      redInd.innerHTML = "Близко :)";
    });
  }

  if (difference === 1) {
    yellowIndicators.forEach((yellowInd) => {
      yellowInd.style.backgroundColor = "yellow";
      yellowInd.innerHTML = "Горячо :D";
    });
  }
}

function runGame() {
  restartBtn.style.display = "block";
  resetIndicatorStyles();
  userNumber = +prompt("Введите число от 1 до 9:");
  decorateIndicators();
  tryBtn.innerHTML = "Попробовать снова";

  if (userNumber < 1 || userNumber > 9) {
    alert("Введите число от 1 до 9!");
  }

  if (userNumber === secretNumber) {
    tryBtn.style.display = "none";

    greenIndicator.style.backgroundColor = "rgb(1, 198, 1)";
    greenIndicator.style.opacity = "1";
    greenIndicator.innerHTML = `Вы угадали! Количество потраченных попыток: ${attempt}`;
  }

  if (userNumber !== secretNumber) {
    lifes--;
    attempt++;
    console.log("ЖИЗНЬ: ", lifes);
    console.log("ПОПЫТКИ: ", attempt);
  }

  if (lifes === 0 || lifes < 0) {
    alert("У вас не осталось попыток :(");
    lifesBlock.style.backgroundColor = "rgba(255, 0, 0, 0.3)";
    tryBtn.disabled = true;
    lifesBlock.innerHTML = "Вы проиграли :(";
  } else {
    lifesBlock.innerHTML = `Попыток осталось: ${lifes}`;
  }

  if (lifes === 1) {
    lifesBlock.innerHTML = "Последняя попытка";
  }
}
