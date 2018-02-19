// Created by Sinisa Drpa on 02/18/18.

import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Monitor from './monitor'

import RequireAuth from './require-auth'
import Authenticate from './authenticate'
import Deauthenticate from './deauthenticate'

const App = () => {
   return (
      <Router>
         <div style={{ minHeight: '100%' }}>
            <Route exact path="/" component={RequireAuth(Monitor)} />
            <Route exact path="/authenticate" component={Authenticate} />
            <Route exact path="/deauthenticate" component={RequireAuth(Deauthenticate)} />
         </div>
      </Router>
   )
}

export default App
