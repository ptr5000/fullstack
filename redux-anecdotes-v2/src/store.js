import { createStore, combineReducers } from 'redux'
import reducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer';

const reducers = combineReducers({
    anecdotes: reducer, 
    notifications:notificationReducer,
    filter:filterReducer})

const store = createStore(reducers)


export default store