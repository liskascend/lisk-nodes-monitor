// Created by Sinisa Drpa on 02/18/18.

import { ActionType } from '../actions/monitor'

const initialState = {
   data: [],
   error: null
}

export default function(state = initialState, action) {
   switch (action.type) {
   case ActionType.fetch: {
      const data = action.payload
      return { data, error: null }
   }
   case ActionType.error: {
      const error = action.payload
      return { data: [], error }
   }
   default:
      return state
   }
}
