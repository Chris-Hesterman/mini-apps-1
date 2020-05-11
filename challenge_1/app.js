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
  }

  checkForWin() {
    let result = false;

    for (let solution in this.solutions) {
      result = solution.every((item) => {
        if (currentTurn) {
          return this.ohs.hasOwnProperty(item.toString());
        } else {
          return this.exes.hasOwnProperty(item.toString());
        }
      });
      if (result) {
        return result;
      }
    }
    return result;
  }

  clickHandler(e) {
    e.target.style.outline = 'none';

    if (e.target.textContent === '..') {
      e.target.textContent = this.currentTurn === true ? 'O' : 'X';
      this.currentTurn = !this.currentTurn;
    }
    if (this.checkForWin) {
      console.log('WINNER', e.target.textContent);
    }
  }
}

clickme.addEventListener('click', TTT.clickHandler);
