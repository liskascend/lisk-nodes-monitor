// Created by Sinisa Drpa on 02/18/18.

import React from 'react'
import PropTypes from 'prop-types'

import Header from './header'
import ProgressIndicator from './progress-indicator'
import NodeItem from './node-item'

const MonitorUI = ({ data, error }) => {
   //console.log(data)
   const renderError = error => {
      if (error) {
         return (
            <div className="alert alert-danger">
               <strong>Oops!</strong> {error}
            </div>
         )
      }
   }
   
   if (data.length === 0) {
      renderError(error)
      return (
         <div className="text-center py-5">
            <ProgressIndicator animated={true} />
         </div>
      )
   }

   return (
      <div>
         <Header />
         <p>Last check: {Date()}</p>
         <div>
            {
               data.map(function(status, idx) {
                  return <NodeItem key={idx} status={status} />
               })
            }
         </div>
      </div>
   )
}
MonitorUI.propTypes = {
   data: PropTypes.array.isRequired,
   error: PropTypes.string
}

export default MonitorUI
