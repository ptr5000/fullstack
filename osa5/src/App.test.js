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
    const noteComponents = app.find(LoginForm)
    expect(noteComponents.length).toEqual(1)

    const blogs = app.find(Blog)
    expect(blogs.length).toEqual(0)
  })
})