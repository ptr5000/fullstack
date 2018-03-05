import axios from 'axios'

const getAll = async () => {
  const response = await axios.get('http://localhost:3001/anecdotes')
  return response.data
}

const addAnecdote = async (content) => {
    return axios.post('http://localhost:3001/anecdotes', {content, votes: 0})
}

const vote = async (obj) => {
    return axios.put('http://localhost:3001/anecdotes/' + obj.id, {...obj, votes: obj.votes+1})
}


export default { getAll, addAnecdote, vote }