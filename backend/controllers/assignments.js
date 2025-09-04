const assignmentsRouter = require('express').Router()

assignmentsRouter.get('/', async (request, response, next) => {
  try {
    console.log('get all')
  } catch (error) {
    next(error)
  }
})

assignmentsRouter.get('/:id', async (request, response, next) => {
  try {
    console.log('get by id')
  } catch (error) {
    next(error)
  }
})

assignmentsRouter.post('/', async (request, respones, next) => {
  try {

  } catch (error) {
    next(error)
  }
})

module.exports = assignmentsRouter