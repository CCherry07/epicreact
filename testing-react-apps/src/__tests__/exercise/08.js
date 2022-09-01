// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import { render, screen ,act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useCounter from '../../components/use-counter'


test('exposes the count and increment/decrement functions', async () => {
  let result
  function TestComponent(params) {
    result = useCounter()
    return null
  }

  render(<TestComponent/>)
  expect(result.count).toBe(0)
  act(()=>result.increment())
  expect(result.count).toBe(1)
  act(()=>result.decrement())
  expect(result.count).toBe(0)
})

/* eslint no-unused-vars:0 */
