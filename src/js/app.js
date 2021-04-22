const gameBoard = document.querySelector('#cards');
const allCards = document.querySelectorAll('.card');
const nextCard = document.querySelector('#next-card');
const yourScore = document.querySelector('#score');
const restartButton = document.querySelector('.restart');
const standardIconsArray = [
  `<i class="fas fa-atom"></i>`,
  `<i class="fas fa-frog"></i>`,
  `<i class="fas fa-feather-alt"></i>`,
  `<i class="fas fa-cogs"></i>`,
  `<i class="fas fa-anchor"></i>`,
  `<i class="fas fa-fan"></i>`,
  `<i class="fas fa-bolt"></i>`,
  `<i class="fas fa-hat-wizard"></i>`,
  `<i class="fas fa-apple-alt"></i>`,
  `<i class="fas fa-bell"></i>`,
  `<i class="fas fa-bomb"></i>`,
  `<i class="fas fa-brain"></i>`,
];
let allCardsOpenedFlag = false;
let hiddenCardsArray = [];
let totalScore = 0;

let shuffle = function(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

function getRandomHiddenCardsArrayIndex(arrayLength) {
  return Math.trunc(Math.random() * arrayLength);
}

function checkForWin() {
  if (hiddenCardsArray.length === 0) {
    allCardsOpenedFlag = true;
    setTimeout(function() {
      alert('Winner!');
    }, 200);
  }
}

function rebuildHiddenCardsArray(event) {
  hiddenCardsArray = hiddenCardsArray.filter(iconElement => iconElement !== event.target.innerHTML);
}

function setNextCardIcon() {
  let randomIndex = getRandomHiddenCardsArrayIndex(hiddenCardsArray.length);
  if (hiddenCardsArray.length > 0) {
    nextCard.innerHTML = hiddenCardsArray[randomIndex];
  }
}

function openMatchedCard(event) {
  event.target.classList.remove('show');
  event.target.classList.add('matched');
}

function hideNotMatchedCard(event) {
  setTimeout(function() {
    event.target.classList.remove('show');
  }, 200);
}

function revealOneCard(event) {
  if (event.target.tagName !== 'LI' ||  allCardsOpenedFlag === true) {
    return;
  }
  totalScore++;
  yourScore.innerHTML = totalScore;
  event.target.classList.add('show');
  if (nextCard.innerHTML === event.target.innerHTML) {
    openMatchedCard(event)
    rebuildHiddenCardsArray(event);
    setNextCardIcon();
    checkForWin();
  } else {
    hideNotMatchedCard(event);
  }
}

function resetGame() {
  let shuffledCardIndex = 0;

  hiddenCardsArray = shuffle(standardIconsArray);
  setNextCardIcon();
  totalScore = 0;
  yourScore.innerHTML = 0;
  allCardsOpenedFlag = false;
  allCards.forEach(function(element) {
    element.classList.remove('matched');
    element.classList.remove('show');
    element.innerHTML = hiddenCardsArray[shuffledCardIndex];
    shuffledCardIndex++;
  })
}

gameBoard.addEventListener('click', revealOneCard);
restartButton.addEventListener('click', resetGame);

resetGame();