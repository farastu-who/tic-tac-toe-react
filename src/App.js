import { useState } from 'react'; // The useState hook is imported from the react package

function Square({value, onSquareClick, isWinningSquare}) { // The Square component is updated to accept a value prop and an onSquareClick prop
  const className = isWinningSquare ? 'square winning' : 'square';
  return (
  <button className={className} onClick={onSquareClick}>
    {value}
  </button>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], // The first row
    [3, 4, 5], // The second row
    [6, 7, 8], // The third row
    [0, 3, 6], // The first column
    [1, 4, 7], // The second column
    [2, 5, 8], // The third column
    [0, 4, 8], // The first diagonal
    [2, 4, 6], // The second diagonal
  ];
  for (let i = 0; i < lines.length; i++) { // The for loop iterates through the lines array
    const [a, b, c] = lines[i]; // The const keyword is used to declare a constant variable (a, b, c) and assign it to the current element of the lines array
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) { // The if statement checks if the current element of the squares array is not null and if the current element of the squares array is equal to the next element of the squares array and if the current element of the squares array is equal to the next element of the squares array
      return {
        winner: squares[a], // The return statement returns the current element of the squares array
        line: lines[i], // The return statement returns the current element of the lines array
      };
    }
  }
  return null; // The return statement returns null if the for loop does not return a winner
}

export default function Board() {
  const [xIsNext, setXIsNext] = useState(true); // The useState hook is used to create a state variable (xIsNext) and a function (setXIsNext) to update the state variable. The useState hook is called with the initial value of the state variable (true)
  const [squares, setSquares] = useState(Array(9).fill(null));
  const winnerData = calculateWinner(squares);
  const winner = winnerData ? winnerData.winner : null; // The winner variable is assigned to the winner property of the winnerData object if the winnerData object is not null
  const winningLine = winnerData ? winnerData.line : [];

  let status;
  if (winnerData) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  function handleClick(i) { // JavaScript supports closures which means an inner function (e.g. handleClick) has access to variables and functions defined in a outer function (e.g. Board). The handleClick function can read the squares state and call the setSquares method because they are both defined inside of the Board function.
    if (squares[i] || calculateWinner(squares)) { // The handleClick function checks if the current element of the squares array is not null or if the calculateWinner function returns a winner 
      return; // The handleClick function returns early if the square is already filled
    }
    const nextSquares = squares.slice(); // The handleClick function creates a copy of the squares array (nextSquares) with the JavaScript slice() Array method
    if (xIsNext) {
     nextSquares[i] = 'X'; // The first element of the nextSquares array is replaced with an X
    } else {
      nextSquares[i] = 'O'; // The first element of the nextSquares array is replaced with an O
    }
      setSquares(nextSquares); // The handleClick function calls the setSquares function with the nextSquares array as an argument
      setXIsNext(!xIsNext); // The handleClick function calls the setXIsNext function with the opposite value of the xIsNext state variable as an argument
  }
    return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value = {squares[0]} onSquareClick={() => handleClick(0)} isWinningSquare={winningLine.includes(0)} />
        <Square value = {squares[1]} onSquareClick={() => handleClick(1)} isWinningSquare={winningLine.includes(1)} />
        <Square value = {squares[2]} onSquareClick={() => handleClick(2)} isWinningSquare={winningLine.includes(2)} />
      </div>
      <div className="board-row">
        <Square value = {squares[3]} onSquareClick={() => handleClick(3)} isWinningSquare={winningLine.includes(3)} />
        <Square value = {squares[4]} onSquareClick={() => handleClick(4)} isWinningSquare={winningLine.includes(4)} />
        <Square value = {squares[5]} onSquareClick={() => handleClick(5)} isWinningSquare={winningLine.includes(5)} />
      </div>
     <div className="board-row">
        <Square value = {squares[6]} onSquareClick={() => handleClick(6)} isWinningSquare={winningLine.includes(6)} />
        <Square value = {squares[7]} onSquareClick={() => handleClick(7)} isWinningSquare={winningLine.includes(7)} />
        <Square value = {squares[8]} onSquareClick={() => handleClick(8)} isWinningSquare={winningLine.includes(8)} />
      </div>

  </>
  );
}