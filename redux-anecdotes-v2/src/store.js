import { createStore, combineReducers, applyMiddleware } from 'redux'
import reducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer';


import thunk from 'redux-thunk'

const reducers = combineReducers({
    anecdotes: reducer, 
    notifications:notificationReducer,
    filter:filterReducer})

const store = createStore(reducers, applyMiddleware(thunk))


export default store