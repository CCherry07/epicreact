// form testing
// http://localhost:3000/login

import * as React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import faker from 'faker'
import Login from '../../components/login'

function buildLogionForm(overrides) {
  return {
    username: faker.internet.userName(),
    password: faker.internet.password(),
    ...overrides
  }
}

test('submitting the form calls onSubmit with username and password', async () => {
  const handleSubmit = jest.fn()
  render(<Login onSubmit={handleSubmit} />)

  const usernameInput = screen.getByRole('textbox', { name: /username/i })
  const passwordInput = screen.getByLabelText(/password/i)
  const submit = screen.getByRole('button', { name: /submit/i })

  const loginInfo = buildLogionForm({ username:"kd" })

  await userEvent.type(usernameInput, loginInfo.username)
  await userEvent.type(passwordInput, loginInfo.password)
  await userEvent.click(submit)
  // Ensure that a mock function is called with specific arguments.
  expect(handleSubmit).toHaveBeenCalledWith(loginInfo)
  // Ensures that a mock function is called an exact number of times.
  expect(handleSubmit).toHaveBeenCalledTimes(1)

  // 🐨 create a variable called "submittedData" and a handleSubmit function that
  // accepts the data and assigns submittedData to the data that was submitted
  // 💰 if you need a hand, here's what the handleSubmit function should do:
  // const handleSubmit = data => (submittedData = data)
  //
  // 🐨 render the login with your handleSubmit function as the onSubmit prop
  //
  // 🐨 get the username and password fields via `getByLabelText`
  // 🐨 use `await userEvent.type...` to change the username and password fields to
  //    whatever you want
  //
  // 🐨 click on the button with the text "Submit"
  //
  // assert that submittedData is correct
  // 💰 use `toEqual` from Jest: 📜 https://jestjs.io/docs/en/expect#toequalvalue
})

/*
eslint
  no-unused-vars: "off",
*/
