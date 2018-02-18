import React from 'react'

import { randomString } from './lib'
import { Link } from 'react-router-dom'

const Header = () => {
   return (
      <ul className="list-unstyled">
         <li><Link to='/deauthenticate' key={randomString()}>Sign out</Link></li>
      </ul>
   )
}

export default Header
