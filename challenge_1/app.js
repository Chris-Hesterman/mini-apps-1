const game = document.querySelector('.board');
const squares = document.querySelectorAll('.playerSquare');
const reset = document.querySelector('.reset');
const stateOfGame = document.querySelector('h2');
const turn = document.querySelector('span');
const turnIndicator = document.querySelector('h3');
const exesWins = document.querySelector('#exesWins');
const ohsWins = document.querySelector('#ohsWins');

const gameState = {
  moves: 0,
  exes: {},
  ohs: {},
  exesWins: 0,
  ohsWins: 0,
  gamegameOver: false,
  currentTurn: false,
  lastWinner: 'X',
  solutions: [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
  ]
};

const checkForWin = () => {
  let result = false;

  for (let solution of gameState.solutions) {
    result = solution.every((item) => {
      if (!gameState.currentTurn) {
        return gameState.ohs.hasOwnProperty(item);
      } else {
        return gameState.exes.hasOwnProperty(item);
      }
    });
    if (result) {
      game.removeEventListener('click', gameState.handleClick);
      gameState.gameOver = true;
      return result;
    }
  }
  return result;
};

const checkForTie = () => {
  if (gameState.moves >= 9 && !gameState.gameOver) {
    gameState.gameOver = true;
    gameState.moves = 0;
    game.removeEventListener('click', gameState.handleClick);
    stateOfGame.textContent = 'TIE GAME';
  }
};

const handleClick = (e) => {
  e.target.style.outline = 'none';
  if (e.target.className === 'reset') {
    resetGame();
  }
  if (e.target.textContent === '..') {
    e.target.textContent = gameState.currentTurn === true ? 'O' : 'X';

    if (gameState.currentTurn) {
      gameState.ohs[e.target.id] = e.target.id;
    } else {
      gameState.exes[e.target.id] = e.target.id;
    }
    gameState.moves++;
    gameState.currentTurn = !gameState.currentTurn;
  }
  if (checkForWin()) {
    updateGameStatus(e.target.textContent);
  }
  checkForTie();
};

const updateGameStatus = (lastWinner) => {
  gameState.moves = 0;
  gameState.gameOver = true;
  gameState.lastWinner = lastWinner;

  if (gameState.lastWinner === 'X') {
    gameState.exesWins++;
    exesWins.textContent = gameState.exesWins + ' ';
  } else {
    gameState.ohsWins++;
    ohsWins.textContent = gameState.ohsWins + ' ';
  }

  stateOfGame.textContent = `${gameState.lastWinner} WINS!!`;
};

const resetGame = (e) => {
  for (let square of squares) {
    square.textContent = '..';
  }
  gameState.exes = {};
  gameState.ohs = {};

  if (gameState.gameOver) {
    gameState.gameOver = false;
    stateOfGame.textContent = 'Game In Progress';
    gameState.currentTurn = gameState.lastWinner === 'X' ? false : true;
    turn.textContent = gameState.currentTurn === true ? 'O' : 'X';
    game.addEventListener('click', gameState.handleClick);
  }
};

game.addEventListener('click', handleClick);
reset.addEventListener('click', handleClick);
