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
    const assignment = await assignmentServices.getAssignmentById(request.params.id)

    return response.json(assignment)
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