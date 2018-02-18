import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

export default function(ComposedComponent) {
   class Authentication extends Component {
      componentWillMount() {
         const { authenticated, history, location } = this.props
         if (!authenticated) {
            const params = new URLSearchParams(location.search)
            const next = params.get('next')
            const query = next ? `?next=${next}` : ''
            history.push(`/authenticate${query}`)
         }
      }

      componentWillUpdate(nextProps) {
         if (!nextProps.authenticated) {
            const { history } = this.props
            history.push('/authenticate')
         }
      }

      render() {
         return <ComposedComponent {...this.props} />
      }
   }
   Authentication.propTypes = {
      authenticated: PropTypes.bool,
      //
      history: PropTypes.object,
      location: PropTypes.object
   }

   function mapStateToProps(state) {
      return { 
         authenticated: state.authentication.token !== null
      }
   }

   return withRouter(connect(mapStateToProps)(Authentication))
}
