// testing custom hooks
// http://localhost:3000/counter-hook

import { renderHook, act } from '@testing-library/react-hooks'
import useCounter from '../../components/use-counter'

// function renderHook({ initialProps } = {}) {
//   const result = {}
//   function TestComponent() {
//     result.current = useCounter(initialProps)
//     return null
//   }
//   render(<TestComponent />)
//   return result
// }

test('exposes the count and increment/decrement functions', async () => {
  const { result } = renderHook(useCounter)
  expect(result.current.count).toBe(0)
  act(() => result.current.increment())
  expect(result.current.count).toBe(1)
  act(() => result.current.decrement())
  expect(result.current.count).toBe(0)
})
test('allows customization of the initial count', async () => {
  const { result } = renderHook(useCounter, { initialProps: { initialCount: 3 } })
  expect(result.current.count).toBe(3)
  act(() => result.current.increment())
  expect(result.current.count).toBe(4)
  act(() => result.current.decrement())
  expect(result.current.count).toBe(3)
})
test('allows customization of the step', async () => {
  const { result } = renderHook(useCounter, { initialProps: { step: 2 } })
  expect(result.current.count).toBe(0)
  act(() => result.current.increment())
  expect(result.current.count).toBe(2)
  act(() => result.current.decrement())
  expect(result.current.count).toBe(0)
})
test('change hook initialProps case', async () => {
  const { result , rerender } = renderHook(useCounter, { initialProps: { step: 3 } })
  expect(result.current.count).toBe(0)
  act(() => result.current.increment())
  expect(result.current.count).toBe(3)
  rerender({ step: 2 })
  act(() => result.current.decrement())
  expect(result.current.count).toBe(1)
})

/* eslint no-unused-vars:0 */
