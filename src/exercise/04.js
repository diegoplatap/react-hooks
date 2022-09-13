// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react'
import {useLocalStorageState} from '../utils'

function Board({squares, onClick, winner}) {
  function Square({i}) {
    const winnerClassName =
      winner && squares[i] === winner ? `winner--${winner}` : ''
    return (
      <button
        className={`square ${winnerClassName}`}
        onClick={() => onClick(i)}
      >
        {squares[i]}
      </button>
    )
  }

  return (
    <div>
      <div className="board-row">
        <Square i={0} />
        <Square i={1} />
        <Square i={2} />
      </div>
      <div className="board-row">
        <Square i={3} />
        <Square i={4} />
        <Square i={5} />
      </div>
      <div className="board-row">
        <Square i={6} />
        <Square i={7} />
        <Square i={8} />
      </div>
    </div>
  )
}

function Game() {
  const [history, setHistory] = React.useState([Array(9).fill(null)])
  console.log('🚀 ~ file: 04.js ~ line 44 ~ Game ~ history', history)
  const [currentStep, setCurrentStep] = React.useState(0)
  console.log('🚀 ~ file: 04.js ~ line 45 ~ Game ~ currentStep', currentStep)

  const currentSquares = history[currentStep]
  const winner = calculateWinner(currentSquares)
  const nextValue = calculateNextValue(currentSquares)
  const status = calculateStatus(winner, currentSquares, nextValue)

  function selectSquare(square) {
    if (winner || currentSquares[square]) {
      return
    }
    const newHistory = history.slice(0, currentStep + 1)
    console.log(
      '🚀 ~ file: 04.js ~ line 58 ~ selectSquare ~ newHistory',
      newHistory,
    )
    const squaresCopy = [...currentSquares]
    squaresCopy[square] = nextValue

    setHistory([...newHistory, squaresCopy])
    setCurrentStep(newHistory.length)
  }

  function restart() {
    setHistory([Array(9).fill(null)])
    setCurrentStep(0)
  }

  const moves = history.map((stepSquares, step) => {
    const message = step === 0 ? 'Go to game start' : `Go to move #${step}`
    const isCurrentStep = step === currentStep
    return (
      <li key={step}>
        <button onClick={() => setCurrentStep(step)} disabled={isCurrentStep}>
          {message} {isCurrentStep ? '(current)' : null}
        </button>
      </li>
    )
  })

  return (
    <div className="game">
      <div className="game-board">
        <Board
          onClick={selectSquare}
          squares={currentSquares}
          winner={winner}
        />
        <button className="restart" onClick={restart}>
          restart
        </button>
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
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
