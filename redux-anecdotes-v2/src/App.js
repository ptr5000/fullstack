import React from 'react'
import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import { connect } from 'react-redux'
import client from './services/client'
import {init} from './reducers/anecdoteReducer'

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await client.getAll()
    dispatch(init(anecdotes))
  }
}
class App extends React.Component {
  componentDidMount () {
    this.props.initializeAnecdotes()
  }
  render() {
    return (
      <div>
        <h1>Programming anecdotes</h1>
        <Notification />
        <AnecdoteList />
        <AnecdoteForm />
      </div>
    )
  }
}

export default connect(
  null, { initializeAnecdotes }
)(App)

