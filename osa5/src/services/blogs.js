import axios from 'axios'
const blogsUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(blogsUrl)
  return request.then(response => response.data)
}


const login = (username, password) => {
  const request = axios.post('/api/login', {username, password})
  return request.then(response => response.data)
}

export default { getAll, login }