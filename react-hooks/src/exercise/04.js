// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react'
import {useLocalStorageState} from '../utils'
function Board() {
  const [squares,setSquares] = useLocalStorageState("squares",()=>Array(9).fill(null))
  const [historyActionState , setHistoryActionState] = useLocalStorageState("historyActionState",[()=>Array(9).fill(null)])
  const [step , setStep ] = useLocalStorageState("step",0)
  const winner = calculateWinner(squares)
  const nextValue = calculateNextValue(squares)
  const status = calculateStatus(winner,squares,nextValue)

  function selectSquare(square) {
    if (squares[square] || winner) return
    const newsquares = [...squares]
    newsquares[square] = nextValue
    setHistoryActionState((states)=>[...states,newsquares])
    setSquares(newsquares)
  }

  function restart() {
    setSquares(Array(9).fill(null))
  }

  function renderSquare(i) {
    return (
      <button className="square" onClick={() => selectSquare(i)}>
        {squares[i]}
      </button>
    )
  }

  function handleHistoryAction(historyActionState,index) {
    setSquares(historyActionState)
    setStep(index)
  }

  return (
    <div>
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
      <div className="status">{status}</div>
      <ul className='history--action'>
        { historyActionState.length > 0 && historyActionState.map((item,index)=><li 
            onClick={()=>handleHistoryAction(item,index)} key={index}>
            {index === 0 ? "go to game start" : `go to remove #${index} ${step === index ? '( current )' : ""}`}
          </li>) }
      </ul>
      <button className="restart" onClick={restart}>
        restart
      </button>
    </div>
  )
}

function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  )
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O'
}

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function App() {
  return <Game />
}

export default App
