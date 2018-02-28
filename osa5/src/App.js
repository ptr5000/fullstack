import React from 'react'
import {Blog, BlogForm} from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/Login'

export class MessageBox extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      message: props.message
    }
  }

  render() {
    if (this.state.message != null) {
      return (
        <div className="messageBox">
          <p>{this.props.message}</p>
        </div>
      )
    } else {
      return (
        <div></div>
      )
    }
  }
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      password: '',
      message: ''
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
      .then(blogs => this.setState({
        blogs: blogs.sort((a, b) => {
          return b.likes - a.likes;
        })
      }))
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
      .catch(resp => {
        this.setMessage('Login failed');
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

  handleBlogAdded = (title, author, url) => {
    this.setMessage('Added blog ' + title + ' by ' + author)
  }

  setMessage = (message) => {
    this.setState({message})

    setTimeout(() => {
      this.setState({message: null})
    }, 1500)
  }

  render() {

    if (this.state.token == null) {
      return (
        <div>
          <MessageBox message={this.state.message}/>
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
          <MessageBox message={this.state.message}/>

          <h2>blogs</h2>

          <p>{this.state.token.name}&nbsp;logged in
            <button onClick={this.handleLogout}>Log out</button>
          </p>

          <BlogForm handleBlogAdded={this.handleBlogAdded}/> {this
            .state
            .blogs
            .map(blog => <Blog key={blog._id} blog={blog} username={this.state.token.username}/>)}
        </div>
      );
    }
  }
}

export default App;
