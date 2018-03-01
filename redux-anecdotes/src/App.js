import React from 'react';


class App extends React.Component {
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
        <form>
          <div><input /></div>
          <button>create</button> 
        </form>
      </div>
    )
  }
}

export default App