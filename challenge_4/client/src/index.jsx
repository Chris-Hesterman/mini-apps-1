import React from 'react';
import ReactDOM from 'react-dom';
import Board from './components/Board.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: [],
      player1: [],
      player2: []
    };
  }

  componentDidMount() {
    let boardMatrix = new Array(6).fill(['-', '-', '-', '-', '-', '-', '-']);
    this.setState({ board: boardMatrix });
  }

  render() {
    return (
      <div>
        <h1>Connect Four!</h1>
        <Board board={this.state.board} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
