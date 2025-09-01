const Course = require('../models/course')
const jwt = require('jsonwebtoken')
const configs = require('../utils/configs')
const userServices = require('../services/userServices')
const Problem = require('../models/problem')

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

const deleteCourse = async (request, response) => {
  const decodedToken = jwt.verify(request.token, configs.SECRET_KEY)

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const savedUser = await userServices.getUserById(decodedToken.id)

  if (!savedUser) {
    return response.status(404).json({ error: 'user not found' })
  }

  const savedCourse = await getCourseById(request.params.id)

  if (!savedCourse) {
    return response.status(404).json({ error: 'course not found' })
  }

  if (savedCourse.user.toString() !== savedUser._id.toString()) {
    return response.status(401).json({ error: 'username does not match the course creator' })
  }

  for (const problem of savedCourse.problems) {
    await Problem.findByIdAndDelete(problem._id.toString())
  }
  
  await Course.findByIdAndDelete(request.params.id)
  savedUser.courses = savedUser.courses.filter(courseId => courseId.toString() !== request.params.id)
  await savedUser.save()
}

const updateCourse = async (request, response) => {
  const decodedToken = jwt.verify(request.token, configs.SECRET_KEY)

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const savedCourse = await getCourseById(request.params.id)
  
  if (!savedCourse) {
    return response.status(404).json({ error: 'course not found' })
  }

  const savedUser = await userServices.getUserById(savedCourse.user.toString())

  if (!savedUser) {
    return response.status(404).json({ error: 'user not found' })
  }

  const body = request.body

  savedCourse.title = body.title
  savedCourse.createdAt = body.createdAt
  savedCourse.problems = body.problems
  savedCourse.courseCode = body.courseCode
  savedCourse.students = body.students
  const updatedCourse = await savedCourse.save()

  return updatedCourse
}

module.exports = {
  getCourses,
  getCourseById,
  createCourse,
  deleteCourse,
  updateCourse,
  // getCourseByCode,
}