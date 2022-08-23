// useReducer: simple Counter
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'

const countReducer = (state, action) => {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, count: state.count + action.step }
    case "DECREMENT":
      return { ...state, count: state.count - action.step }
    default:
      { throw new Error(`Unsupported action type ${action.type}`) }
  }
}

function Counter({ initialCount = 0, step = 1 }) {
  // const countReducer = (state,action)=>({...state , ...(typeof action === "function" ? action(state) : action)})
  // const [state, changeState] = React.useReducer(countReducer, {count:initialCount})
  // const { count } = state
  // const increment = () => changeState((currentState=>({count:currentState.count + step})))

  const [state, dispatch] = React.useReducer(countReducer, {
    count: initialCount,
  })
  const { count } = state
  const increment = () => dispatch({ type: "INCREMENT", step })
  const decrement = () => dispatch({ type: "DECREMENT", step })

  const countAction = (type)=>()=>dispatch({type,step})
  return (
    <div>
      <h1> {count} </h1>
      <button onClick={increment}> SUM </button>
      <button onClick={countAction("DECREMENT")}> SUB </button>
    </div>
  )
}

function App() {
  return <Counter />
}

export default App
