const coursesRouter = require('express').Router()
// const Course = require('../models/course')
const courseServices = require('../services/courseServices')
// const userServices = require('../services/userServices')
// const configs = require('../utils/configs')
// const jwt = require('jsonwebtoken')

coursesRouter.get('/', async (_request, response) => {
  try {
    const courses = await courseServices.getCourses()
    return response.json(courses)
  } catch (error) {
    next(error)
  }
})

coursesRouter.get('/:id', async (request, response, next) => {
  try {
    const course = await courseServices.getCourseById(request.params.id)
    return response.json(course)
  } catch (error) {
    next(error)
  }
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