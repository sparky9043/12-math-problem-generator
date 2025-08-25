const coursesRouter = require('express').Router()
const courseServices = require('../services/courseServices')

coursesRouter.get('/', async (_request, response) => {
  const courses = await courseServices.getCourses()
  return response.json(courses)
})

module.exports = coursesRouter