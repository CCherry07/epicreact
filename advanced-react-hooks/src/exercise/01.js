// useReducer: simple Counter
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'

function Counter({initialCount = 0, step = 1}) {
  const [state, changeState] = React.useReducer(countReducer, {count:initialCount})
  const { count } = state
  function countReducer(initialCount,action) {
    return { ...initialCount , ...action }
  }
  const increment = () => changeState({ count: count + step })
  return <button onClick={increment}>{count}</button>
}

function App() {
  return <Counter />
}

export default App
