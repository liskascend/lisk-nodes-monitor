// Created by Sinisa Drpa on 02/18/18.

import { ActionType } from '../actions/auth'

const initialState = {
   token: null
}

export default function(state = initialState, action) {
   switch (action.type) {
   case ActionType.authenticate: {
      const token = action.payload
      return { token }
   }
   case ActionType.deauthenticate:
      return { token: null }
   default:
      return state
   }
}
