// Created by Sinisa Drpa on 02/18/18.

import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'

import authentication from './auth'
import monitor from './monitor'

const rootReducer = combineReducers({
   authentication,
   monitor,
   form
});

export default rootReducer
