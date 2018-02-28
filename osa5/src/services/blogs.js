import axios from 'axios'
const blogsUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(blogsUrl)
  return request.then(response => response.data)
}

const login = (username, password) => {
  const request = axios.post('/api/login', {username, password})
  return request.then(response => response.data)
}

const createBlog = (title, author, url) => {
  const config = {
    headers: {
      'Authorization': token
    }
  }

  const request = axios.post('/api/blogs', {
    title,
    author,
    url
  }, config)
  return request.then(response => response.data)
}

const voteBlog = (id, blogData) => {
  const config = {
    headers: {
      'Authorization': token
    }
  }

  const request = axios.put('/api/blogs/' + id, blogData, config)
  return request.then(response => response.data)
}

const deleteBlog = (id) => {
  const config = {
    headers: {
      'Authorization': token
    }
  }

  const request = axios.delete('/api/blogs/' + id, config)
  return request.then(response => response.data)
}

export default {
  getAll,
  login,
  createBlog,
  setToken,
  voteBlog,
  deleteBlog
}