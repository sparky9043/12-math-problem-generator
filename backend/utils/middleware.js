const logger = require('./logger')

const requestLogger = (request, response, next) => {
  logger.info('Method: ', request.method)
  logger.info('Path: ', request.path)

  next()
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
    response.status(400).json({ error: 'username already exists' })
  } else if (error.name === 'ValidationError') {
    response.status(400).json({ error: error.message })
  }

  next(error)
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')

  if (authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.replace('Bearer ', '')
  }
  
  next()
}

module.exports = { requestLogger, errorHandler, tokenExtractor }