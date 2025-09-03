const Course = require('../models/course')
const jwt = require('jsonwebtoken')
const configs = require('../utils/configs')
const userServices = require('../services/userServices')
const Problem = require('../models/problem')
const Errors = require('../utils/errors')

const getCourses = async () => {
  const courses = await Course.find({}).populate('problems', { question: 1 })

  if (!courses) {
    throw new Errors.NotFoundError('courses not found')
  }

  return courses
}

const getCourseById = async (id) => {
  const course = await Course.findById(id).populate('problems', { question: 1 })

  if (!course) {
    throw new Errors.NotFoundError('course not found')
  }

  return course
}

const createCourse = async ({ title, courseCode, userId }) => {

  const newCourse = new Course({
    title,
    courseCode,
    createdAt: Date.now(),
    user: userId,
  })

  const user = await userServices.getUserById(userId)

  if (!user) {
    throw new Errors.NotFoundError('user not found')
  }

  const savedCourse = await newCourse.save()
  user.courses = user.courses.concat(savedCourse._id)
  await user.save()

  return savedCourse
}

const deleteCourse = async ({ userId, courseId }) => {
  console.log(userId, courseId)

  const savedUser = await userServices.getUserById(userId)

  const savedCourse = await getCourseById(courseId)

  if (!savedCourse) {
    throw new Errors.NotFoundError('course not found')
  }

  if (savedCourse.user.toString() !== userId) {
    return new Errors.TokenError('user id does not match')
  }

  for (const problem of savedCourse.problems) {
    await Problem.findByIdAndDelete(problem._id.toString())
  }

  await Course.findByIdAndDelete(courseId)
  savedUser.courses = savedUser.courses.filter(courseId => courseId.toString() !== courseId)
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

  const savedUser = await userServices.getUserById(savedCourse.user._id)

  if (!savedUser) {
    return response.status(404).json({ error: 'user not found' })
  }

  const body = request.body

  for (const id of body.students) {
    const savedStudent = await userServices.getUserById(id)
    savedCourse.students = savedCourse.students.concat(savedStudent._id)
    savedStudent.courses = savedStudent.courses.concat(savedCourse._id)
    await savedStudent.save()
  }

  savedCourse.title = body.title
  savedCourse.createdAt = body.createdAt
  savedCourse.problems = body.problems
  savedCourse.courseCode = body.courseCode
  // savedCourse.students = savedCourse.students.concat()
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