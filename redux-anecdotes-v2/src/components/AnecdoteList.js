import React from 'react'
import {vote} from '../reducers/anecdoteReducer.js'
import {setNotification} from '../reducers/notificationReducer.js'
import Filter from './Filter'
import PropTypes from 'prop-types'

class AnecdoteList extends React.Component {
  componentDidMount() { 
    const {store} = this.context

    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate()
    })
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    const {store} = this.context

    const anecdotes = store.getState().anecdotes
    return (
      <div>
        <h2>Anecdotes</h2>
        <Filter store={store} />
        {anecdotes.sort((a, b) => b.votes - a.votes)
          .filter(anecdote => anecdote.content.indexOf(store.getState().filter.filter) > -1)
          .map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => {
                store.dispatch(vote(anecdote.id))
                store.dispatch(setNotification("Voted"))
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

AnecdoteList.contextTypes = {
  store: PropTypes.object
}
export default AnecdoteList
