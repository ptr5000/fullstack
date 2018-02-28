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
        this.setState({title: '', author: '', url: ''})
      })

  }

  render() {

    if(this.state.formVisible) {

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
