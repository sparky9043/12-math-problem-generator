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

assignmentsRouter.post('/', middleware.userExtractor, async (request, response, next) => {
  try {
    const { assignmentTitle, courseId, problems } = request.body
    const userId = request.user.id
  
    const assignment = await assignmentServices.createAssignment({
      assignmentTitle, courseId, userId, problems
    })

    return response.status(201).json(assignment)
  } catch (error) {
    next(error)
  }
})

assignmentsRouter.put('/:id', middleware.userExtractor, async (request, response, next) => {
  try {
    const { studentId, correctProblems } = request.body
    const assignmentId = request.params.id
    const assignment = await assignmentServices.updateAssignment({
      assignmentId, studentId, correctProblems
    })

    return response.status(201).json(assignment)
  } catch (error) {
    next(error)
  }
})

module.exports = assignmentsRouter