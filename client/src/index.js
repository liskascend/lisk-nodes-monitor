// Created by Sinisa Drpa on 02/18/18.

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import App from './components/app'
import reducers from './reducers'
import { ActionType, tokenKey } from './actions/auth'

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore)
const store = createStoreWithMiddleware(
   reducers,
   // Add the Redux DevTools extension enhancer if it is installed
   window.devToolsExtension ? window.devToolsExtension() : f => f
)

// If we have a token, consider the user to be signed in
const token = localStorage.getItem(tokenKey)
if (token) {
   store.dispatch({ 
      type: ActionType.authenticate, 
      payload: token
   })
}

ReactDOM.render(
   <Provider store={store}>
      <App />
   </Provider>
   , document.querySelector('.container'))
