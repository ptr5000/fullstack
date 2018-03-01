import React from 'react';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      newAnecdote: ''
    }
  }

  handleTextChange = (event) => {
    this.setState({newAnecdote: event.target.value})
  }

  handleCreate = (event) => {
    let {store} = this.props

    event.preventDefault()

    store.dispatch({type: "ADD_ANECDOTE", text: this.state.newAnecdote})

    this.setState({newAnecdote: ''})
  }

  render() {
    let {store} = this.props
    const anecdotes = store.getState()
    console.log(anecdotes)
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.sort((a,b)=>b.votes-a.votes).map(anecdote=>
          <div key={anecdote.id}>
            <div>
              {anecdote.content} 
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={(e)=>{store.dispatch({type:'VOTE', id:anecdote.id})}}>vote</button>
            </div>
          </div>
        )}
        <h2>create new</h2>
        <form onSubmit={this.handleCreate}>
          <div><input value={this.state.newAnecdote} onChange={this.handleTextChange}/>
           </div>
          <button type="submit">create</button> 
        </form>
      </div>
    )
  }
}

export default App