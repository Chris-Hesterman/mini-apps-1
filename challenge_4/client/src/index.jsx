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
  }

  placePiece(e) {
    const currentPlayer = this.state.currentPlayer;
    const player = e.currentTarget.getAttribute('player');
    const column = e.currentTarget.getAttribute('x');
    const row = e.currentTarget.getAttribute('y');
    let board = this.state.board;

    if (player !== 'X' && player !== 'Y') {
      board[row][column] = this.state.currentPlayer;
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
