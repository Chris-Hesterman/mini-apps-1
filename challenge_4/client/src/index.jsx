import React from 'react';
import ReactDOM from 'react-dom';
import Board from './components/Board.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: [],
      currentPlayer: 'X',
      turnsTaken: 0
    };
    this.placePiece = this.placePiece.bind(this);
    this.checkHorizontalWin = this.checkHorizontalWin.bind(this);
    this.checkVerticalWin = this.checkVerticalWin.bind(this);
    this.checkDiagonalDescWin = this.checkDiagonalDescWin.bind(this);
    this.checkDiagonalAscWin = this.checkDiagonalAscWin.bind(this);
  }

  placePiece(e) {
    const currentPlayer = this.state.currentPlayer;
    const player = e.currentTarget.getAttribute('player');
    let column = +e.currentTarget.getAttribute('x');
    let row = +e.currentTarget.getAttribute('y');
    let board = this.state.board;

    while (row + 1 < board.length && board[row + 1][column] === '-') {
      row += 1;
    }
    if (player !== 'X' && player !== 'Y') {
      board[row][column] = this.state.currentPlayer;
      this.checkDiagonalDescWin(board, row, column);
      this.checkDiagonalAscWin(board, row, column);
      this.checkHorizontalWin(board, row);
      this.checkVerticalWin(board, column);

      this.setState((prevState) => {
        board = prevState.board;
        board[row][column] = prevState.currentPlayer;
        return {
          board: board,
          currentPlayer: currentPlayer === 'X' ? 'Y' : 'X',
          turnsTaken: prevState.turnsTaken + 1
        };
      });
    }
  }

  checkVerticalWin(board, col) {
    let playerWinString = '';
    for (let row of board) {
      let pieceOrBlank = row[col];
      playerWinString += pieceOrBlank;
    }
    if (playerWinString.includes('XXXX') || playerWinString.includes('YYYY')) {
      console.log(this.state.currentPlayer, ' Wins!');
    }
  }

  checkHorizontalWin(board, row) {
    let playerWinString = board[row].join('');

    if (playerWinString.includes('XXXX') || playerWinString.includes('YYYY')) {
      console.log(this.state.currentPlayer, ' Wins!');
    }
  }
  checkDiagonalDescWin(board, row, col) {
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
      console.log(this.state.currentPlayer, ' Wins!');
    }
  }

  checkDiagonalAscWin(board, row, col) {
    let start;
    let playerWinString = '';

    if (col + row > board[0].length - 1) {
      start = [row, board[0].length - 1];
    } else {
      start = [0, row + col];
    }
    while (start[0] < board.length && start[1] >= 0) {
      playerWinString += board[start[0]][start[1]];
      start[0]++;
      start[1]--;
    }
    console.log(playerWinString);
    if (playerWinString.includes('XXXX') || playerWinString.includes('YYYY')) {
      console.log(this.state.currentPlayer, ' Wins!');
    }
  }

  componentDidMount() {
    let boardMatrix = [];
    for (let i = 0; i < 6; i++) {
      boardMatrix.push(['-', '-', '-', '-', '-', '-', '-']);
    }
    this.setState({ board: boardMatrix });
  }

  render() {
    return (
      <div>
        <h1>Connect Four!</h1>
        <Board
          board={this.state.board}
          placePiece={this.placePiece}
          currentPlayer={this.state.currentPlayer}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
