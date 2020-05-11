var clickme = document.querySelector('.board');

class Board {
  constructor() {
    this.exes = {};
    this.ohs = {};
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
  }

  checkForWin() {
    let result = false;

    for (let solution of this.solutions) {
      result = solution.every((item) => {
        if (this.currentTurn) {
          return this.ohs.hasOwnProperty(item);
        } else {
          return this.exes.hasOwnProperty(item);
        }
      });
      // if (result) {
      //   console.log('winner');
      //   return result;
      // }
      // console.log(result);
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
      this.currentTurn = !this.currentTurn;
    }
    console.log(this.exes, this.ohs);
    if (this.checkForWin()) {
    }
  }
}

let TTT = new Board();

clickme.addEventListener('click', TTT.handleClick);
