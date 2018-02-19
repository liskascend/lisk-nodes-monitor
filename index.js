// Created by Sinisa Drpa on 02/18/18.

const express = require('express')
const cors = require('cors') // https://github.com/expressjs/cors
const bodyParser = require('body-parser')

const config = require('./config')
const verifyToken = require('./server/middleware/verifyToken')
const Monitor = require('./server/modules/monitor')

const Auth = require('./server/routes/auth')
const auth = new Auth()
const Status = require('./server/routes/status')
const stat = new Status()

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Static
app.use(express.static('./server/static/'))
app.use(express.static('./client/dist/'))

// Routes

app.use('/auth', cors(), auth.authenticate)
app.use('/status', cors(), verifyToken, stat.get)

const monitor = new Monitor()

const serverPort = 3000
app.listen(serverPort, () => {
  console.log('Server is running on http://localhost:' + serverPort);
})
