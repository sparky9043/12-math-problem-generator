const logger = require('./logger')
const jwt = require('jsonwebtoken')
const configs = require('./configs')
const User = require('../models/user')

// const requestLogger = (request, response, next) => {
//   logger.info('Method: ', request.method)
//   logger.info('Path: ', request.path)

//   next()
// }

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
    response.status(400).json({ error: error.message })
  } else if (error.name === 'ValidationError') {
    response.status(400).json({ error: error.message })
  } else if (error.name === 'CastError') {
    response.status(400).json({ error: 'malformatted id' })
  } else if (error.name === 'JsonWebTokenError') {
    response.status(401).json({ error: 'token invalid '})
  } else if (error.name === 'TokenExpiredError') {
    response.status(401).json({ error: 'token expired' })
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

const userExtractor = async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, configs.SECRET_KEY)
  
    const user = await User.findById(decodedToken.id)

    if (!user) {
      return response.status(404).json({ error: 'user not found' })
    }

    request.user = { id: user._id.toString() }
    
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = { errorHandler, tokenExtractor, userExtractor }