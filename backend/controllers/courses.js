const coursesRouter = require('express').Router()
// const Course = require('../models/course')
const courseServices = require('../services/courseServices')
// const userServices = require('../services/userServices')
// const configs = require('../utils/configs')
// const jwt = require('jsonwebtoken')

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

coursesRouter.post('/', async (request, response) => {
  const savedCourse = await courseServices.createCourse(request, response)

  return response.status(201).json(savedCourse)
})

coursesRouter.delete('/:id', async (request, response) => {
  await courseServices.deleteCourse(request, response)

  return response.status(204).end()
})

coursesRouter.put('/:id', async (request, response) => {
  const savedCourse = await courseServices.updateCourse(request, response)

  return response.status(201).json(savedCourse)
})

module.exports = coursesRouter