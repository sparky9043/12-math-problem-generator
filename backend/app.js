// require('express-async-errors')
const express = require('express')
const mongoose = require('mongoose')
const configs = require('./utils/configs')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const loginRouter = require('./controllers/login')
const usersRouter = require('./controllers/users')
const problemsRouter = require('./controllers/problems')

const app = express()

mongoose
  .connect(configs.MONGODB_URI)
  .then(() => {
    logger.info('Connected to MongoDB')
  })
  .catch((error) => {
    logger.error('Error: ', error.message)
  })

app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)
app.use('/api/problems', problemsRouter)

app.use(middleware.errorHandler)

module.exports = app