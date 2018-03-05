

const getId = () => (100000*Math.random()).toFixed(0)

const initialState = []

const reducer = (store = initialState, action) => {
    
  if (action.type==='VOTE') {
    const old = store.filter(a => a.id !==action.id)
    const voted = store.find(a => a.id === action.id)

    return [...old, { ...voted, votes: voted.votes+1} ]
  }
  if (action.type === 'CREATE') {

    return [...store, { content: action.content, id: getId(), votes:0 }]
  }

  if(action.type === 'INIT') {
    return action.data
  }

  return store
}

export const vote = (id) => {
  return { type: 'VOTE', id }
}


export const createAnecdote = (content) => {
  return { type: 'CREATE', content }
}

export const init = (data) => {
  return { type: 'INIT', data }
}

export default reducer