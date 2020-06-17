var checkForWin = {
  checkVerticalWin: (board, row, col) => {
    let playerWinString = '';

    for (let row of board) {
      let pieceOrBlank = row[col];
      playerWinString += pieceOrBlank;
    }
    if (playerWinString.includes('XXXX') || playerWinString.includes('YYYY')) {
      return board[row][col];
    }
  },
  checkHorizontalWin: (board, row, col) => {
    let playerWinString = board[row].join('');

    if (playerWinString.includes('XXXX') || playerWinString.includes('YYYY')) {
      return board[row][col];
    }
  },
  checkDiagonalDescWin: (board, row, col) => {
    let start;
    let playerWinString = '';
    if (row === col) {
      start = [0, 0];
    }
    if (col < row) {
      start = [Math.abs(row - col), 0];
    }
    if (col > row) {
      start = [0, Math.abs(row - col)];
    }
    while (start[0] < board.length && start[1] < board[0].length) {
      playerWinString += board[start[0]][start[1]];
      start[0]++;
      start[1]++;
    }
    if (playerWinString.includes('XXXX') || playerWinString.includes('YYYY')) {
      return board[row][col];
    }
  },
  checkDiagonalAscWin: (board, row, col) => {
    let start;
    let playerWinString = '';
    let rowLength = board[0].length - 1;

    if (col + row > rowLength) {
      let startRow = col + row - rowLength;
      start = [startRow, rowLength];
    } else {
      start = [0, row + col];
    }

    while (start[0] < board.length && start[1] > 0) {
      playerWinString += board[start[0]][start[1]];
      start[0]++;
      start[1]--;
    }

    if (playerWinString.includes('XXXX') || playerWinString.includes('YYYY')) {
      return board[row][col];
    }
  },
  checkTie: (turns) => {
    if (turns === 42) {
      return 'TIE GAME';
    }
  }
};

// export default checkForWin;

// this.checkTie = this.checkTie.bind(this);
// this.checkHorizontalWin = this.checkHorizontalWin.bind(this);
// this.checkVerticalWin = this.checkVerticalWin.bind(this);
// this.checkDiagonalDescWin = this.checkDiagonalDescWin.bind(this);
// this.checkDiagonalAscWin = this.checkDiagonalAscWin.bind(this);

// checkVerticalWin(board, col) {
//     let playerWinString = '';
//     let winner = this.state.currentPlayer;

//     for (let row of board) {
//       let pieceOrBlank = row[col];
//       playerWinString += pieceOrBlank;
//     }
//     if (playerWinString.includes('XXXX') || playerWinString.includes('YYYY')) {
//       console.log(this.state.currentPlayer, ' Wins!');
//     }
//   }

//   checkHorizontalWin(board, row) {
//     let playerWinString = board[row].join('');

//     if (playerWinString.includes('XXXX') || playerWinString.includes('YYYY')) {
//       console.log(this.state.currentPlayer, ' Wins!');
//     }
//   }

//   checkDiagonalDescWin(board, row, col) {
//     let start;
//     let playerWinString = '';
//     if (row === col) {
//       start = [0, 0];
//     }
//     if (col < row) {
//       start = [Math.abs(row - col), 0];
//     }
//     if (col > row) {
//       start = [0, Math.abs(row - col)];
//     }
//     while (start[0] < board.length && start[1] < board[0].length) {
//       playerWinString += board[start[0]][start[1]];
//       start[0]++;
//       start[1]++;
//     }
//     if (playerWinString.includes('XXXX') || playerWinString.includes('YYYY')) {
//       console.log(this.state.currentPlayer, ' Wins!');
//     }
//   }

//   checkDiagonalAscWin(board, row, col) {
//     let start;
//     let playerWinString = '';
//     let rowLength = board[0].length - 1;

//     if (col + row > rowLength) {
//       let startRow = col + row - rowLength;
//       start = [startRow, rowLength];
//     } else {
//       start = [0, row + col];
//     }

//     while (start[0] < board.length && start[1] > 0) {
//       playerWinString += board[start[0]][start[1]];
//       console.log('diag: ', playerWinString);
//       start[0]++;
//       start[1]--;
//     }

//     if (playerWinString.includes('XXXX') || playerWinString.includes('YYYY')) {
//       console.log(this.state.currentPlayer, ' Wins!');
//     }
//   }
