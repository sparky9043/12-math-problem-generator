const Course = require('../models/course')

const getCourses = async () => {
  const courses = await Course.find({})
  return courses
}

const getCourseById = async (id) => {
  const course = await Course.findById(id)
  return course
}

const createCourse = async () => {

}

module.exports = { getCourses, getCourseById }