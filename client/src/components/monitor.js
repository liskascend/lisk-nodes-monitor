// Created by Sinisa Drpa on 02/18/18.

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'

import { fetch } from '../actions/monitor'
import ProgressIndicator from './progress-indicator'
import MonitorUI from './monitor-ui'

class Monitor extends Component {
   constructor(props) {
      super(props)
      this.tick = this.tick.bind(this)
   }

   componentDidMount() {
      var intervalId = setInterval(this.tick, 1000)
      this.setState({intervalId: intervalId})
   }
   
   componentWillUnmount() {
      if (this.state) {
         clearInterval(this.state.intervalId)
      }
   }
   
   tick() {
      const { authenticated, fetch } = this.props
      if (authenticated) {
         fetch()
      }
   }

   render() {
      const { data, error } = this.props
      if (data.length === 0) {
         return (
            <div className="text-center py-5">
               <ProgressIndicator animated={true} />
            </div>
         )
      }
      return (
         <MonitorUI 
            data={data}
            error={error} />
      )
   }
}
Monitor.propTypes = {
   authenticated: PropTypes.bool.isRequired,
   data: PropTypes.array,
   error: PropTypes.string,
   //
   fetch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
   //console.log(state.monitor)
   return {
      authenticated: state.authentication.token !== null,
      data: state.monitor.data,
      error: state.monitor.error
   }
}

const mapDispatchToProps = dispatch => {
   return bindActionCreators({ 
      fetch,
   }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Monitor)
