// require('express-async-errors')
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const configs = require('./utils/configs')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const loginRouter = require('./controllers/login')
const usersRouter = require('./controllers/users')
const problemsRouter = require('./controllers/problems')
const coursesRouter = require('./controllers/courses')
const assignmentsRouter = require('./controllers/assignments')

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

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
} else {
  app.use(middleware.requestLogger)
}
app.use(middleware.tokenExtractor)

app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)
app.use('/api/problems', problemsRouter)
app.use('/api/courses', coursesRouter)
app.use('/api/assignments', assignmentsRouter)

app.use(middleware.errorHandler)

module.exports = app