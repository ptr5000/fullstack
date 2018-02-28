import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import LoginForm from './components/Login'
import {Blog} from './components/Blog'

jest.mock('./services/blogs')

describe('<App />', () => {
  let app
  beforeAll(() => {
    app = mount(<App />)
  })

  it('tests that login is visible', () => {
    app.update()
    const loginForm = app.find(LoginForm)
    expect(loginForm.length).toEqual(1)

    const blogs = app.find(Blog)
    expect(blogs.length).toEqual(0)
  })

  it('tests that login works', () => {
    app.update()
    const loginForm = app.find(LoginForm)
    expect(loginForm.length).toEqual(1)

    let username = loginForm.find('input[name="username"]')
    username.simulate('change', { target: { value: 'testuser' } })

    let password = loginForm.find('input[name="password"]')
    password.simulate('change', { target: { value: 'testuser' } })

    let form = loginForm.find('form')
    form.simulate('submit', { preventDefault () {} });

    setImmediate(() => {
        app.update()

        const blogs = app.find(Blog)
        expect(blogs.length).toEqual(1)
    });
  })
})