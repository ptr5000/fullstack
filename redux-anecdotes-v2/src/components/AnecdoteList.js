import React from 'react'
import {vote} from '../reducers/anecdoteReducer.js'
import {setNotification} from '../reducers/notificationReducer.js'
import Filter from './Filter'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'


class AnecdoteList extends React.Component {
  render() {
    const {store} = this.context

    return (
      <div>
        <h2>Anecdotes</h2>
        <Filter />
        {this.props.anecdotes.sort((a, b) => b.votes - a.votes)
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


const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes.filter(anecdote => anecdote.content.indexOf(state.filter.filter) > -1)
  }
}

const AnecdoteListConnected = connect(mapStateToProps)(AnecdoteList)


export default AnecdoteListConnected
