import React from 'react';
import ReactDOM from 'react-dom';
import Board from './components/Board.jsx';
import checkForWin from './utils/checkForWin.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: [],
      currentPlayer: 'X',
      turnsTaken: 0,
      end: false
    };
    this.placePiece = this.placePiece.bind(this);
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

      const diagonalD = checkForWin.checkDiagonalDescWin(board, row, column);
      const diagonalA = checkForWin.checkDiagonalAscWin(board, row, column);
      const horizontal = checkForWin.checkHorizontalWin(board, row, column);
      const vertical = checkForWin.checkVerticalWin(board, row, column);
      const tie = checkForWin.checkTie(this.state.turnsTaken);
      const checks = [diagonalD, diagonalA, horizontal, vertical, tie];

      for (let check of checks) {
        if (check !== undefined) {
          this.setState({ end: true });
        }
      }

      if (this.state.end) {
        return;
      } else {
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
  }

  componentDidMount() {
    let boardMatrix = [];
    for (let i = 0; i < 6; i++) {
      boardMatrix.push(['-', '-', '-', '-', '-', '-', '-']);
    }
    this.setState({ board: boardMatrix });
  }

  render() {
    return this.state.end && this.state.turnsTaken < 42 ? (
      <div>
        <h1>{this.state.currentPlayer === 'X' ? 'Y' : 'X'} Wins!</h1>
        <h2>Refresh to play again</h2>
        <Board
          board={this.state.board}
          currentPlayer={this.state.currentPlayer}
          placePiece={(e) => console.log('game over, refresh to restart')}
        />
      </div>
    ) : this.state.turnsTaken < 42 ? (
      <div>
        <h1>Connect Four!</h1>
        <h2>{this.state.currentPlayer + "'s turn"}</h2>
        <Board
          board={this.state.board}
          placePiece={this.placePiece}
          currentPlayer={this.state.currentPlayer}
        />
      </div>
    ) : (
      <div>
        <h1> Tie Game!</h1>
        <h2>Refresh to play again</h2>
        <Board
          board={this.state.board}
          currentPlayer={this.state.currentPlayer}
          placePiece={(e) => console.log('game over, refresh to restart')}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
