import axios from 'axios'
const blogsUrl = '/api/blogs'

let token = null



const data = [{
        "likes": 13,
        "_id": "5a96b8ace16228742bd417bf",
        "title": "title",
        "author": "author",
        "url": "http://www.example.com",
        "user": {
            "_id": "5a8ffee51089421245c6913f",
            "username": "petteri",
            "name": "asdf"
        },
        "__v": 0
    }
]


const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = () => {
    return Promise.resolve(data)
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