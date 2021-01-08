import React, { useState } from 'react';

import Square from './Square';
import calculateWinner from '../utils/calculateWinner';

export default function Board(){

   const [squares,setSquares] = useState(Array(9).fill(null));
   const [xisNext,setXisNext] = useState(true);

   function handleClick(i){
     if(calculateWinner(squares) || squares[i]){
          return;
     }
      const nSquares = squares.slice();
      nSquares[i] = xisNext ? 'X' : "O";

      setXisNext(prevState => !prevState);
      setSquares(nSquares);
   }

    function renderSquare(i) {
          return <Square 
                    value={squares[i]}
                    onClick={() => handleClick(i)}
                 />;
    };
    const winner = calculateWinner(squares);
    let status;
    if(winner){
      status = "Winner " + winner;
    }else {
      status = "Next player " + (xisNext ? "X" : "O"); 
    }
   
return (
       <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {renderSquare(0)}
            {renderSquare(1)}
            {renderSquare(2)}
          </div>
          <div className="board-row">
            {renderSquare(3)}
            {renderSquare(4)}
            {renderSquare(5)}
          </div>
          <div className="board-row">
            {renderSquare(6)}
            {renderSquare(7)}
            {renderSquare(8)}
          </div>
        </div>
      )
}