import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'

import { deauthenticate } from '../actions/auth'

class Deauthenticate extends Component {
   componentWillMount() {
      const { deauthenticate } = this.props
      deauthenticate()
   }

   render() {
      return (
         <p>Until next time...</p>
      )
   }
}
Deauthenticate.propTypes = {
   deauthenticate: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => {
   return bindActionCreators({ 
      deauthenticate,
   }, dispatch)
}

export default connect(null, mapDispatchToProps)(Deauthenticate)
