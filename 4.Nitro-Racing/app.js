var popup = document.querySelector(".popup");
var score = document.querySelector(".score");
var gamearea = document.querySelector(".gamearea");
document.addEventListener("keydown", downfun);
document.addEventListener("keyup", upfun);
popup.addEventListener("click", startGame);
var road = document.createElement("div");
var car = document.createElement("div");
var player = {
  speed: 5,
  start: false,
  score: 0,
};
let keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowRight: false,
  ArrowLeft: false,
};
function downfun(event) {
  event.preventDefault();
  keys[event.key] = true;
}
function upfun(event) {
  event.preventDefault();
  keys[event.key] = false;
}

function startGame() {
  player.score = 0;
  popup.style.display = "none";
  gamearea.style.display = "block";
  createRoad();
  createCar();
  getRandomCar();
  movingRoad();
  start();
}
function stopGame() {
  popup.style.display = "block";
  gamearea.style.display = "None";
  gamearea.innerHTML = "";
  popup.innerHTML = `Prees Again To Restart The Game
  Total Score is ${player.score}`;
  player.start = false;
}

function createCar() {
  gamearea.appendChild(car);
  car.classList.add("car");
  car.style.top = "425px";
  car.style.left = "185px";
  player.x = car.offsetLeft;
  player.y = car.offsetTop;
}
function createRoad() {
  for (let i = 0; i < 4; i++) {
    let roadline = document.createElement("div");
    gamearea.appendChild(roadline);
    roadline.setAttribute("class", "road");
    roadline.y = i * 150;
    roadline.style.top = i * 150 + "px";
    // domRect = roadline.getBoundingClientRect();
    // console.log(domRect);
  }
}
function getRandomCar() {
  for (let i = 0; i < Math.floor(Math.random() * 2) + 3; i++) {
    let enemycar = document.createElement("div");
    enemycar.setAttribute("class", "enemycar");
    enemycar.y = (i + 1) * -150;
    enemycar.style.top = (i + 1) * -150 + "px";
    enemycar.style.backgroundColor =
      "#" + Math.floor(Math.random() * 16777215).toString(16);
    enemycar.style.left = Math.floor(Math.random() * 350) + "px";
    gamearea.appendChild(enemycar);
  }
}
function movingRoad() {
  let temp = document.querySelectorAll(".road");

  temp.forEach((item) => {
    if (item.y >= 550) item.y -= 600;
    item.y += player.speed;

    item.style.top = item.y + "px";
  });
}
function movingenemycar(car) {
  let temp = document.querySelectorAll(".enemycar");

  temp.forEach((item, key, arr) => {
    if (item.y >= 550) {
      //item.y -= 1500;
      //item.style.left = Math.floor(Math.random() * 350) + "px";
      item.remove();
    }
    if (item.y >= 250) {
      if (key == arr.length - 1) getRandomCar();
    }
    item.y += player.speed * 0.5;
    item.style.top = item.y + "px";

    isCollide(car, item);
  });
}

function isCollide(a, b) {
  arect = a.getBoundingClientRect();
  brect = b.getBoundingClientRect();

  if (
    !(
      arect.top > brect.bottom ||
      arect.bottom < brect.top ||
      arect.right < brect.left ||
      brect.right < arect.left
    )
  )
    stopGame();
}
function start() {
  player.start = true;
  movingRoad();
  movingenemycar(car);
  moveCar();
}
function moveCar() {
  if (player.start) {
    if (keys.ArrowDown && player.y < 480) {
      player.y += player.speed;
    }
    if (keys.ArrowUp && player.y > 10) {
      player.y -= player.speed;
    }
    if (keys.ArrowLeft && player.x > 5) {
      player.x -= player.speed;
    }
    if (keys.ArrowRight && player.x < 345) {
      player.x += player.speed;
    }

    car.style.top = player.y + "px";
    car.style.left = player.x + "px";
    player.score++;

    score.innerHTML = player.score;

    window.requestAnimationFrame(start);
  }
}
