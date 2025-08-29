const Course = require('../models/course')
const jwt = require('jsonwebtoken')
const configs = require('../utils/configs')
const userServices = require('../services/userServices')

const getCourses = async () => {
  const courses = await Course.find({}).populate('problems', { question: 1 })
  return courses
}

const getCourseById = async (id) => {
  const course = await Course.findById(id).populate('problems', { question: 1})
  return course
}

const createCourse = async (request, response) => {
  const body = request.body

  const decodedToken = jwt.verify(request.token, configs.SECRET_KEY)

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const user = await userServices.getUserById(decodedToken.id)

  if (!user) {
    return response.status(404).json({ error: 'user not found' })
  }

  const newCourse = new Course({
    title: body.title,
    courseCode: body.courseCode,
    createdAt: Date.now(),
    user: user._id,
  })

  const savedCourse = await newCourse.save()
  user.courses = user.courses.concat(savedCourse._id)
  user.save()

  return savedCourse
}

module.exports = { getCourses, getCourseById, createCourse }