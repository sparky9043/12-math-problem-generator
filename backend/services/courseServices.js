const Course = require('../models/course')

const getCourses = async () => {
  const courses = await Course.find({})
  return courses
}

module.exports = { getCourses }