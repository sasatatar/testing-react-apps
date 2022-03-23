// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../../components/login'
import { build, fake } from '@jackfranklin/test-data-bot';

const buildLoginForm = build({
  fields: {
    username: fake(f => f.internet.userName()),
    password: fake(f => f.internet.password())
  }
});

test('submitting the form calls onSubmit with username and password', () => {
  const handleSubmit = jest.fn();
  // 🐨 render the login with your handleSubmit function as the onSubmit prop
  render(<Login onSubmit={handleSubmit} />);
  // 🐨 get the username and password fields via `getByLabelText`
  // 🐨 use userEvent.type to change the username and password fields to
  //    whatever you want
  const usernameField = screen.getByLabelText(/username/i);
  const passwordField = screen.getByLabelText(/password/i);
  const {username, password} = buildLoginForm({password: 'abc'})

  userEvent.type(usernameField, username)
  userEvent.type(passwordField, password)

  // 🐨 click on the button with the text "Submit"
  userEvent.click(screen.getByRole('button', { name: /submit/i }));
  expect(handleSubmit).toHaveBeenCalledWith({ username, password });
})

/*
eslint
  no-unused-vars: "off",
*/
