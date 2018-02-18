import { get } from 'axios'

import { tokenKey } from './auth'
const apiServer = 'http://localhost:' + 3000

export const ActionType = {
   fetch: 'FETCH_DATA'
}

export const fetch = () => {
   return dispatch => {
      const url = `${apiServer}/status`
      const token = localStorage.getItem(tokenKey)
      return get(url, {
         headers: { 'x-access-token': token }
      })
         .then(response => {
            dispatch({ 
               type: ActionType.fetch,
               payload: response.data
            })
         })
         .catch(() => {
            throw 'Authentication error.'
         })
   }
}
