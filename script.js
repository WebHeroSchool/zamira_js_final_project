let selectedLi;
let target = '';
let ul = document.querySelector('.menu__level');
let button = document.querySelector('.menu__start');
let pageMenu = document.querySelector('.menu');
let pageGame = document.querySelector('.game');
let flipCards;
let flipCardInners;
let active = document.querySelector('.active');;


// Выбор уровня сложности
ul.onclick = function(event) {
  target = event.target;
  hightLight(target);
}

// Выделение выбранного уровня сложности
function hightLight(element) {
  if (selectedLi) selectedLi.classList.remove('menu__level_item-active');
  selectedLi = element;
  selectedLi.classList.add('menu__level_item-active');
}

// Перемешивание массива
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Создание карты
function createCard(array) {
	for (let i=0; i<array.length; i++) {
  	let card = document.createElement ('div');
    let cardInner = document.createElement ('div');
    let cardFront = document.createElement ('div');
    let cardBack = document.createElement ('div');
    let imageFront = new Image();
    let imageBack = new Image();

    card.className = 'flip-card';
    pageGame.appendChild(card);

    cardInner.className = 'flip-card__inner';
    card.appendChild(cardInner);

    cardFront.className = 'flip-card__front';
    cardInner.appendChild(cardFront);
    imageFront.src = 'img/card.png';
    imageFront.classList.add('flip-card__image');
    cardFront.appendChild(imageFront);

    cardBack.className = 'flip-card__back';
    cardInner.appendChild(cardBack);
    if (array[i] === 1) {
      imageBack.src = 'img/bag-card.png';
    } else {
      imageBack.src = 'img/game-over-card.png';
    }
    imageBack.classList.add('flip-card__image');
    cardBack.appendChild(imageBack);
  }
}

// Нажатие кнопки начать игру
button.addEventListener('click', () => {
  let array;
  let easy = [1,0,0];
  let middle = [1,0,0,0,0,0];
  let hard = [1,0,0,0,0,0,0,0,0,0];
  if (target.innerHTML ==='Простой' || target.innerHTML === undefined) {
    array = easy;
  }
  if (target.innerHTML ==='Средний') {
    array = middle;
  }
  if (target.innerHTML ==='Сложный') {
    array = hard;
    pageGame.classList.add('width');
  }
  shuffle(array);
  console.log(array);
  pageMenu.classList.add('visible');
  pageGame.classList.remove('visible');
  createCard(array);
  flipCards = document.querySelectorAll('.flip-card');
  flipCardInners = document.querySelectorAll('.flip-card__inner');
  for (let i=0; i<flipCards.length;i++) {
    let flipCardInner = () => flipCardInners[i].classList.toggle('active');
    flipCards[i].addEventListener('click', flipCardInner, {once:true});
  }
});

document.onclick = function(event) {
  if (active !== null) {
    active.classList.toggle('active');
    pageMenu.classList.remove('visible');
    pageGame.classList.add('visible');
    pageGame.classList.remove('width');

    // Удаление карт в конце игры
    while (pageGame.firstChild) {
      pageGame.removeChild(pageGame.firstChild);
    }
  }
  active = document.querySelector('.active');
}
