// Created by Sinisa Drpa on 02/18/18.

import React from 'react'
import PropTypes from 'prop-types'

const NodeItem = ({ status }) => {
   const { address, syncing, height, broadhash, consensus } = status
   if (!height) {
      return (
         <div className="bd-callout bd-callout-danger">
            <h5>Address: {address}</h5>
         </div>
      )
   }
   
   return (
      <div className="bd-callout bd-callout-success">
         <h5>Address: {address}</h5>
         <ul className="list-unstyled pl-3">
            <li>Syncing: {syncing ? 'true' : 'false'}</li>
            <li>Height: {height}</li>
            <li>Broadhash: {broadhash}</li> 
            <li>consensus: {consensus}</li>
         </ul>
      </div>
   )
}
NodeItem.propTypes = {
   status: PropTypes.object,
}

export default NodeItem
