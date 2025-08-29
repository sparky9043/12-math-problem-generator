const coursesRouter = require('express').Router()
const Course = require('../models/course')
const courseServices = require('../services/courseServices')
const userServices = require('../services/userServices')
const configs = require('../utils/configs')
const jwt = require('jsonwebtoken')

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
  // const body = request.body

  // const decodedToken = jwt.verify(request.token, configs.SECRET_KEY)

  // if (!decodedToken.id) {
  //   return response.status(401).json({ error: 'token invalid' })
  // }

  // const user = await userServices.getUserById(decodedToken.id)

  // if (!user) {
  //   return response.status(404).json({ error: 'user not found' })
  // }

  // const newCourse = new Course({
  //   title: body.title,
  //   courseCode: body.courseCode,
  //   createdAt: Date.now(),
  //   user: user._id,
  // })

  // const savedCourse = await newCourse.save()
  // user.courses = user.courses.concat(savedCourse._id)
  // user.save()

  return response.status(201).json(savedCourse)
})

module.exports = coursesRouter