import React from 'react';

const Square = (props) => {
  return (
    <div className="square">
      <div
        className={`${props.player === '-' ? 'empty' : props.player} circle`}
        x={props.x}
        y={props.y}
        player={props.player}
        onClick={(e) => props.placePiece(e)}
      ></div>
    </div>
  );
};

export default Square;
