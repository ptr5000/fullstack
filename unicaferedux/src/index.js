import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import counterReducer from './reducer'
import {createStore} from 'redux'

const store = createStore(counterReducer)


const renderApp = () => {
    ReactDOM.render(<App store={store}/>, document.getElementById('root'));
}
  
renderApp()
store.subscribe(renderApp)