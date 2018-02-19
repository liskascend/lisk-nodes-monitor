// Created by Sinisa Drpa on 02/18/18.

import { post } from 'axios'

const apiServer = 'http://localhost:' + 3000

export const ActionType = {
   authenticate: 'AUTHENTICATE',
   deauthenticate: 'DEAUTHENTICATE',
}

export const tokenKey = 'tokenKey' // localStorage key

export const authenticate = password => {
   return dispatch => {
      const url = `${apiServer}/auth/authenticate`
      return post(url, { password })
         .then(response => {
            const token = response.data.token
            localStorage.setItem(tokenKey, token)

            dispatch({ 
               type: ActionType.authenticate,
               payload: token
            })
         })
         .catch(() => {
            throw 'Authentication error.'
         })
   }
}

export function deauthenticate() {
   localStorage.removeItem(tokenKey)

   return {
      type: ActionType.deauthenticate
   }
}
