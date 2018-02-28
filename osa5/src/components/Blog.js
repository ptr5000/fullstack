import React from 'react'
import blogService from '../services/blogs'

export const Blog = ({blog}) => (
  <div>
    {blog.title}
    {blog.author}
  </div>
)

export class BlogForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      author: '',
      url: ''
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
    
    blogService.createBlog(this.state.title, this.state.author, this.state.url).then(resp => {

    })
    this.setState({title: '', author: '', url: ''})
  }

  render() {
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
        </form>
      </div>
    )
  }
}
