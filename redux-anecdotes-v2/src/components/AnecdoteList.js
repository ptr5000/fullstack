import React from 'react'
import {vote} from '../reducers/anecdoteReducer.js'
import {setNotification} from '../reducers/notificationReducer.js'
import Filter from './Filter'

class AnecdoteList extends React.Component {
  componentDidMount() {
    const { store } = this.props
    
    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate()
    })
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    const anecdotes = this.props.store.getState().anecdotes
    return (
      <div>
        <h2>Anecdotes</h2>
        <Filter store={this.props.store} />
        {anecdotes.sort((a, b) => b.votes - a.votes)
          .filter(anecdote => anecdote.content.indexOf(this.props.store.getState().filter.filter) > -1)
          .map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => {
                this.props.store.dispatch(vote(anecdote.id))
                this.props.store.dispatch(setNotification("Voted"))
              }
              }>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default AnecdoteList
