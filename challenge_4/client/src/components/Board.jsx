import React from 'react';
import Square from './Square.jsx';

var Board = (props) => {
  let newBoard = [];
  let key = -1;
  for (let y = 0; y < props.board.length; y++) {
    let newRow = props.board[y].map((square, index) => {
      key++;
      return (
        <Square
          x={index}
          y={y}
          key={key}
          player={props.board[y][index]}
          placePiece={props.placePiece}
        />
      );
    });
    newBoard.push(newRow);
  }

  return <div className="board">{newBoard}</div>;
};

export default Board;
