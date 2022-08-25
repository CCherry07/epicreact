// Prop Collections and Getters
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react'
import { Switch } from '../switch'


// function callAll(...fns) {
//   return (...args)=>{
//     fns.forEach(fn=>{
//       return fn && fn(...args)
//     })
//   }
// }

const callAll = (...fns) => (...args) => fns.forEach(fn => fn?.(...args))

function useToggle(initialState = false) {
  const [on, setOn] = React.useState(initialState)
  const toggle = () => setOn(!on)
  const togglerProps = { onClick: toggle, 'aria-pressed': on, }
  function getTogglerProps({ onClick, ...props }) {
    return {
      onClick: callAll(onClick, toggle),
      ...props
    }
  }
  return { on, toggle, togglerProps, getTogglerProps }
}

function App() {
  const { on, getTogglerProps } = useToggle(true)
  return (
    <div>
      <Switch {...getTogglerProps({ on })} />
      <hr />
      <button
        {...getTogglerProps({
          'aria-label': 'custom-button',
          onClick: () => console.info('onButtonClick'),
          id: 'custom-button-id',
        })}
      >
        {on ? 'on' : 'off'}
      </button>
    </div>
  )
}

export default App

/*
eslint
  no-unused-vars: "off",
*/
