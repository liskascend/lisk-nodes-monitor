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
         <ul>
            <li>Syncing: {syncing}</li>
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
