import { ActionType } from '../actions/monitor'

const initialState = {
}

export default function(state = initialState, action) {
   switch (action.type) {
   case ActionType.fetch: {
      const data = action.payload
      return data
   }
   default:
      return state
   }
}
