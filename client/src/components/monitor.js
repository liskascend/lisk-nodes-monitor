import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'

import { fetch } from '../actions/monitor'
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
      clearInterval(this.state.intervalId)
   }
   
   tick() {
      const { fetch } = this.props
      fetch()
   }

   render() {
      const { data } = this.props
      return (
         <MonitorUI data={data}/>
      )
   }
}
Monitor.propTypes = {
   data: PropTypes.object,
   fetch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
   return {
      data: state.monitor
   }
}

const mapDispatchToProps = dispatch => {
   return bindActionCreators({ 
      fetch,
   }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Monitor)
