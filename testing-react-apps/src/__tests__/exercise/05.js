// mocking HTTP requests
// http://localhost:3000/login-submission

import * as React from 'react'
// 🐨 you'll need to grab waitForElementToBeRemoved from '@testing-library/react'
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { build, fake } from '@jackfranklin/test-data-bot'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { handlers } from 'test/server-handlers'
// 🐨 you'll need to import rest from 'msw' and setupServer from msw/node
import Login from '../../components/login-submission'

const buildLoginForm = build({
  fields: {
    username: fake(f => f.internet.userName()),
    password: fake(f => f.internet.password()),
  },
})

// 🐨 get the server setup with an async function to handle the login POST request:
// 💰 here's something to get you started
const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test(`logging in displays the user's username`, async () => {
  render(<Login />)
  const { username, password } = buildLoginForm()

  await userEvent.type(screen.getByLabelText(/username/i), username)
  await userEvent.type(screen.getByLabelText(/password/i), password)
  // 🐨 uncomment this and you'll start making the request!
  await userEvent.click(screen.getByRole('button', { name: /submit/i }))
  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))
  expect(screen.getByText(username)).toBeInTheDocument()
})

test('omitting the password results in an error', async () => {
  render(<Login />)
  const { username } = buildLoginForm()
  await userEvent.type(screen.getByLabelText(/username/i), username)
  await userEvent.click(screen.getByRole('button', { name: /submit/i }))
  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))
  expect(screen.getByRole('alert').textContent).toMatchInlineSnapshot(
    `"password required"`,
  )
})

test('unknown server error display the error message', async () => {
  render(<Login />)
  const { username } = buildLoginForm()
  server.use(
    rest.post(
      'https://auth-provider.example.com/api/login',
      async (req, res, ctx) => {
        return res(ctx.status(500), ctx.json({ message: ' some error message ' }))
      },
    ),
  )
  await userEvent.type(screen.getByLabelText(/username/i), username)
  await userEvent.click(screen.getByRole('button', { name: /submit/i }))
  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))
  expect(screen.getByRole('alert').textContent).toMatchInlineSnapshot(
    `" some error message "`,
  )
})
