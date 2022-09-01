// testing with context and a custom render method
// http://localhost:3000/easy-button

import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from '../../components/theme'
import EasyButton from '../../components/easy-button'


function renderWithTheme(ui, { theme = "light", ...options } = {}) {
  function Wrapper({ children }) {
    return <ThemeProvider initialTheme={theme} > {children} </ThemeProvider>
  }
  return render(ui, { wrapper: Wrapper })
}

test('renders with the light styles for the light theme', () => {
  renderWithTheme(<EasyButton>Easy</EasyButton>)
  const button = screen.getByRole('button', { name: /easy/i })
  expect(button).toHaveStyle(`
    background-color: white;
    color: black;
  `)
})

test('renders with the dark styles for the dark theme', () => {
  renderWithTheme(<EasyButton>Easy</EasyButton>, { theme: "dark" })
  const button = screen.getByRole('button', { name: /easy/i })
  expect(button).toHaveStyle(`
    color: white;
    background-color: black;
  `)
})

/* eslint no-unused-vars:0 */
