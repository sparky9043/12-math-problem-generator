const coursesRouter = require('express').Router()
const courseServices = require('../services/courseServices')

coursesRouter.get('/', async (_request, response) => {
  const courses = await courseServices.getCourses()
  return response.json(courses)
})

coursesRouter.get('/:id', async (request, response) => {
  const course = await courseServices.getCourseById(request.params.id)

  if (!course) {
    return response.status(404).json({ error: 'course not found' })
  }

  return response.json(course)
})

module.exports = coursesRouter