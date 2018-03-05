import { createStore, combineReducers } from 'redux'
import reducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'

const reducers = combineReducers({anecdotes: reducer, notifications:notificationReducer})
const store = createStore(reducers)


export default store