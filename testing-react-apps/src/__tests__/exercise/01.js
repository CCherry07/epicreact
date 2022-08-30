// simple test with ReactDOM
// http://localhost:3000/counter

import * as React from 'react'
import { act } from 'react-dom/test-utils'
import { createRoot } from 'react-dom/client'
import Counter from '../../components/counter'

global.IS_REACT_ACT_ENVIRONMENT = true

test('counter increments and decrements when the buttons are clicked', () => {
  const div = document.createElement("div")
  document.body.append(div)
  act(() => {
    createRoot(div).render(<Counter />);
  });
  const buttons = div.querySelectorAll('button')
  const [decrement , increment] = buttons
  const message = div.firstChild.querySelector('div')
  expect(message.textContent).toBe("Current count: 0")
  act(() => increment.dispatchEvent(new MouseEvent('click', {bubbles: true})))
  expect(message.textContent).toBe("Current count: 1")
  act(() => decrement.click())
  expect(message.textContent).toBe("Current count: 0")
  div.remove()
})

/* eslint no-unused-vars:0 */
