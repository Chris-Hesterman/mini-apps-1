var game = document.querySelector('.board');
var reset = document.querySelector('.reset');
var stateOfGame = document.querySelector('h2');
var turn = document.querySelector('span');
class Board {
  constructor() {
    this.moves = 0;
    this.exes = {};
    this.ohs = {};
    this.over = false;
    this.currentTurn = false;
    this.solutions = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
      [1, 5, 9],
      [3, 5, 7]
    ];
    this.checkForWin = this.checkForWin.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  checkForWin() {
    let result = false;

    for (let solution of this.solutions) {
      result = solution.every((item) => {
        if (!this.currentTurn) {
          return this.ohs.hasOwnProperty(item);
        } else {
          return this.exes.hasOwnProperty(item);
        }
      });
      if (result) {
        game.removeEventListener('click', this.handleClick);
        this.over = true;
        return result;
      }
    }
    return result;
  }

  handleClick(e) {
    e.target.style.outline = 'none';

    if (e.target.textContent === '..') {
      e.target.textContent = this.currentTurn === true ? 'O' : 'X';

      if (this.currentTurn) {
        this.ohs[e.target.id] = e.target.id;
      } else {
        this.exes[e.target.id] = e.target.id;
      }
      this.moves++;
      this.currentTurn = !this.currentTurn;
    }
    if (this.checkForWin()) {
      this.moves = 0;
      this.over = true;
      stateOfGame.textContent = `${e.target.textContent} WINS!!`;
    }
    if (this.moves >= 9 && !this.over) {
      this.over = true;
      game.removeEventListener('click', this.handleClick);
      stateOfGame.textContent = 'TIE GAME';
    }
    turn.textContent = this.currentTurn ? 'O' : 'X';
  }

  handleReset(e) {
    e.target.style.outline = 'none';
    let squares = document.querySelectorAll('.playerSquare');
    for (let square of squares) {
      square.textContent = '..';
    }
    this.exes = {};
    this.ohs = {};
    this.moves = 0;
    this.currentTurn = false;

    if (this.over) {
      this.over = false;
      stateOfGame.textContent = 'Game In Progress';
      game.addEventListener('click', this.handleClick);
    }
  }
}

let TicTacToe = new Board();

game.addEventListener('click', TicTacToe.handleClick);
reset.addEventListener('click', TicTacToe.handleReset);
