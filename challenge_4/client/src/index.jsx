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

  checkVerticalWin(board, column) {
    console.log(board, column);
    let playerWinString = '';
    for (let row of board) {
      let pieceOrBlank = row[column];
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
