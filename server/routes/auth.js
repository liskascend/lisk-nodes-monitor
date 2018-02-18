const bcrypt = require('bcrypt')
const config = require('./../../config')
const jwt = require('jsonwebtoken')

// Constructor
function Auth() {}

/**
 * Validate password
 * @param {object} payload - the HTTP body message
 * @returns {object} The result of validation.
 */
const validatePassword = payload => {
   if (payload.password === undefined || 
      typeof payload.password !== 'string' ||
      payload.password.trim().length === 0) {
         return {
            success: false,
            error: 'Password cannot be empty.'
         }
   }

   const isValid = bcrypt.compareSync(payload.password, config.password)
   return {
      success: isValid,
      error: isValid ? null : 'Invalid password'
   }
}

Auth.prototype.authenticate = (req, res) => {
   const result = validatePassword(req.body)
   if (!result.success) {
      return res.status(401).json({
         success: false,
         token: null
      })
   }

   const token = jwt.sign({ ip: req.ip }, config.secret, {
      expiresIn: config.expiration
   })
   return res.status(200).send({
      success: true, 
      token 
   })
}

Auth.prototype.deauthenticate = (req, res) => {
   return res.status(200).send({
      success: true, 
      token: null
   })
}

module.exports = Auth
