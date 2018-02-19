// Created by Sinisa Drpa on 02/18/18.

import { ActionType } from '../actions/auth'

const initialState = {
   token: null,
   error: null
}

export default function(state = initialState, action) {
   switch (action.type) {
   case ActionType.authenticate: {
      const token = action.payload
      return { token, error: null }
   }
   case ActionType.deauthenticate:
      return { token: null, error: null }
   case ActionType.error: {
      const error = action.payload
      return { ...state, error }
   }
   default:
      return state
   }
}
