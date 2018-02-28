import React from 'react'
import {Blog, BlogForm} from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/Login'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      password: ''
    }
    let token = window
      .localStorage
      .getItem('token')

    if (token != null) {
      this.state.token = JSON.parse(token)
      blogService.setToken(this.state.token['token'])
    }

    console.log(this.state.token)
  }

  componentDidMount() {
    blogService
      .getAll()
      .then(blogs => this.setState({blogs}))

  }

  handleLogin = (event) => {
    event.preventDefault()
    blogService
      .login(this.state.username, this.state.password)
      .then(resp => {
        console.log(resp)

        let token = resp
        window
          .localStorage
          .setItem('token', JSON.stringify(token));

        this.setState({token})
        blogService.setToken(token['token'])
      })
  }

  handleLogout = (event) => {
    window
      .localStorage
      .removeItem('token')

    this.setState({token: null})
  }

  handlePasswordChange = (event) => {
    this.setState({password: event.target.value})
  }

  handleUsernameChange = (event) => {
    this.setState({username: event.target.value})
  }

  render() {

    if (this.state.token == null) {
      return (
        <div>

          <LoginForm
            handleLogin={this.handleLogin}
            username={this.state.username}
            password={this.state.password}
            handleUsernameChange={this.handleUsernameChange}
            handlePasswordChange={this.handlePasswordChange}/>
        </div>
      )
    } else {

      return (
        <div>
          <h2>blogs</h2>

          <p>{this.state.token.name} logged in
            <button onClick={this.handleLogout}>Log out</button>
          </p>

          <BlogForm/> {this
            .state
            .blogs
            .map(blog => <Blog key={blog._id} blog={blog}/>)}
        </div>
      );
    }
  }
}

export default App;
