import React from 'react';

const Square = (props) => {
  return (
    <div className="square">
      <div className={`${props.player} circle`}></div>
    </div>
  );
};

export default Square;
