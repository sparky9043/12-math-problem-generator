const assignmentsRouter = require('express').Router()
const middleware = require('../utils/middleware')
const assignmentServices = require('../services/assignmentServices')

assignmentsRouter.get('/', async (request, response, next) => {
  try {
    const assignments = await assignmentServices.getAssignments()

    return response.json(assignments)
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

assignmentsRouter.post('/', middleware.userExtractor, async (request, respones, next) => {
  try {

  } catch (error) {
    next(error)
  }
})

module.exports = assignmentsRouter