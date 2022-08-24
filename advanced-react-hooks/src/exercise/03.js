// useContext: simple Counter
// http://localhost:3000/isolated/exercise/03.js

import * as React from 'react'

const CountContext = React.createContext(0)
const CountProvider = function ({ children }) {
  const [count, setCount] = React.useState(0)
  return <CountContext.Provider value={{ count, setCount }}> {children} </CountContext.Provider>
}
CountContext.displayName = "CountContext"
function useCount() {
  const context = React.useContext(CountContext)
  if (!context) {
    throw new Error(`${CountContext.displayName} must be used within then CountProvider`)
  }
  return context
}

function CountDisplay() {
  const { count } = useCount()
  return <div>{`The current count is ${count}`}</div>
}

function Counter() {
  const { setCount } = useCount()
  const increment = () => setCount(count => count + 1)
  return <button onClick={increment}>Increment count</button>
}

function App() {
  return (
    <div>
      <CountProvider>
        <CountDisplay />
        <Counter />
      </CountProvider>
    </div>
  )
}

export default App
