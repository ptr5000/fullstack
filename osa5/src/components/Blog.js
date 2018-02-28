import React from 'react'
import blogService from '../services/blogs'

export class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      detailsVisible: false,
      likes: this.props.blog.likes
    }
  }

  handleVote = () => {
    blogService.voteBlog(this.props.blog._id, {
      'user': this.props.blog.user._id,
      'likes': this.props.blog.likes + 1,
      'author': this.props.blog.author,
      'title': this.props.blog.title,
      'url': this.props.blog.url
    })

    this.setState({likes: this.state.likes+1})
  }

  render() {
    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }

    return (
      <div
        style={blogStyle}
        >
        <p onClick={e => this.setState({
        detailsVisible: !this.state.detailsVisible
      })}>{this.props.blog.author}: {this.props.blog.title}</p>

        {this.state.detailsVisible && <div>
          <p>
            <a href={this.props.blog.url}>{this.props.blog.url}</a>
          </p>
          <p>Likes: {this.state.likes}
            <button onClick={this.handleVote}>Like</button>
          </p>
          <p>Added by: {this.props.blog.user.name}</p>
        </div>
}
      </div>
    )
  }
}
export class BlogForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      author: '',
      url: '',
      formVisible: false
    }
  }

  handleTitleChange = (event) => {
    this.setState({title: event.target.value})
  }

  handleAuthorChange = (event) => {
    this.setState({author: event.target.value})
  }

  handleURLChange = (event) => {
    this.setState({url: event.target.value})
  }

  handleCreate = (event) => {
    event.preventDefault()

    blogService
      .createBlog(this.state.title, this.state.author, this.state.url)
      .then(resp => {
        this
          .props
          .handleBlogAdded(this.state.title, this.state.author, this.state.url)
        this.setState({title: '', author: '', url: '', formVisible: false})
      })
  }

  render() {

    if (this.state.formVisible) {

      return (
        <div className="registrationForm">
          <form onSubmit={this.handleCreate}>
            <label>Title:</label>
            <input value={this.state.title} onChange={this.handleTitleChange}/>
            <label>Author:</label>
            <input value={this.state.author} onChange={this.handleAuthorChange}/>
            <label>URL:</label>
            <input value={this.state.url} onChange={this.handleURLChange}/>
            <button type="submit">Create</button>
            <button onClick={e => this.setState({formVisible: false})}>Cancel</button>
          </form>
        </div>
      )
    } else {
      return (
        <div>
          <button onClick={e => this.setState({formVisible: true})}>Create blog</button>
        </div>
      )
    }
  }
}
