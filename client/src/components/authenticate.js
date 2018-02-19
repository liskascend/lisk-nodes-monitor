// Created by Sinisa Drpa on 02/18/18.

import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Field, reduxForm, SubmissionError } from 'redux-form'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

import { authenticate } from '../actions/auth'
import ProgressIndicator from './progress-indicator'

const Authenticate = props => {
   // Returns a promise in order redux-form submitting to work
   const formDidSubmit = ({ password }) => {
      const { authenticate, location, history } = props
      return authenticate(password)
         .then(() => {
            const query = new URLSearchParams(location.search)
            const next = query.get('next')
            const path = next ? `${next}` : '/'
            history.push(path)
         }, error => {
            throw new SubmissionError({ _error: error})
         })
   }

   const renderError = error => {
      if (error) {
         return (
            <div className="alert alert-danger">
               <strong>Oops!</strong> {error}
            </div>
         )
      }
   }

   const { error, handleSubmit, pristine, submitting } = props
   return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding:'5em 0' }}>
         <div>
            <h3 className="text-center">Sign in to Monitor Server</h3>
            <form onSubmit={handleSubmit(formDidSubmit)}>
               <div className="form-group">
                  <Field className="form-control"
                     name="password"
                     type="password"
                     placeholder="Password"
                     component="input"
                     value='qwerty'
                  />
               </div>
               {renderError(error)}
               <button 
                  disabled={pristine || submitting}
                  className="btn btn-primary btn-lg btn-block">
                  <ProgressIndicator animated={submitting} /> Sign in
               </button>
            </form>
         </div>
      </div>
   )
}
Authenticate.propTypes = {
   handleSubmit: PropTypes.func.isRequired,
   submitting: PropTypes.bool.isRequired,
   pristine: PropTypes.bool.isRequired,
   error: PropTypes.string,
   //
   history: PropTypes.object,
   location: PropTypes.object,
   //
   authenticate: PropTypes.func.isRequired
}

const validate = (values) => {
   let errors = {}
   if (!values.password) {
      errors.password = 'Password cannot be empty.'
   }
   return errors
}

const mapDispatchToProps = dispatch => {
   return bindActionCreators({ 
      authenticate,
   }, dispatch)
}

export default withRouter(connect(null, mapDispatchToProps)(reduxForm({
   validate,
   form: 'authenticateForm',
})(Authenticate)))
