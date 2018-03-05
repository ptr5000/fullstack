import React from 'react'
import PropTypes from 'prop-types'
import {createAnecdote} from '../reducers/anecdoteReducer.js'
import {setNotification} from '../reducers/notificationReducer.js'
import client from '../services/client'

class AnecdoteForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault()
    const {store} = this.context

    const content = e.target.anecdote.value

    store.dispatch(createAnecdote(content))
    store.dispatch(setNotification("New anecdote created"))

    client.addAnecdote(content)

    e.target.anecdote.value = ''
  }
   render() {
     return (
       <div>
      <h2>create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div><input name='anecdote'/></div>
          <button>create</button> 
        </form>
      </div>
     )
   }
}

AnecdoteForm.contextTypes = {
  store: PropTypes.object
}

export default AnecdoteForm
