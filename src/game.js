import React, { useState } from 'react';
import './game.css';

import Board from './components/Board';
import calculateWinner from './utils/calculateWinner';
 
export default function Game(){
const [history,setHistory] = useState([{squares: Array(9).fill(null)}]);
const [xIsNext,setXisNext] = useState(true);
const [stepNumber,setStepNumber] = useState(0);

function handleClick(i){
  const newhistory = history.slice(0,stepNumber + 1);
  const current = newhistory[newhistory.length - 1];

  const squares = current.squares.slice();
   if(calculateWinner(squares) || squares[i]){
        return;
   }
    squares[i] = xIsNext ? 'X' : "O";
    
    
    setHistory(history.concat([{
      squares: squares
    }])
    );
    setStepNumber(history.length);
    setXisNext(prevState => !prevState);
 };

 function jumpTo(step){
      setStepNumber(step);
      setXisNext((step % 2 ) === 0);
 }

    const newhistory = history;
    const current = newhistory[stepNumber];
    const winner = calculateWinner(current.squares);
    const moves = history.map((step,move)=> {
        const desc = move ?
         "Go to move #" + move : 'Go to game start';
         return (
           <li key={move}>
             <button onClick={()=> jumpTo(move)}>{desc}</button>
           </li>
         )
    })
    let status;
    if(winner){
       status = "Winner: " + winner;
    }else {
      status = 'Next player: ' + (xIsNext ? "X" : "O");
    } 
 
      return (
        <div className="game">
          <div className="game-board">
            <Board squares={current.squares}  handleClick={handleClick}/>
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
}