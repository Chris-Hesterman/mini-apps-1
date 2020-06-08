import React from 'react';
import Square from './Square.jsx';

var Board = (props) => {
  let newBoard = [];
  let key = -1;
  for (let x = 0; x < props.board.length; x++) {
    let newRow = props.board[x].map((square, index) => {
      let squareInfo = { x: x, y: index, player: props.board[x][index] };
      key++;
      return <Square info={squareInfo} key={key} />;
    });
    newBoard.push(newRow);
  }

  return <div className="board">{newBoard}</div>;
};

export default Board;
