import { createStore, combineReducers } from 'redux'
import reducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer';
import client from './services/client'
import {init} from './reducers/anecdoteReducer'

const reducers = combineReducers({
    anecdotes: reducer, 
    notifications:notificationReducer,
    filter:filterReducer})

const store = createStore(reducers)

client.getAll().then(anecdotes => store.dispatch(init(anecdotes)))

export default store