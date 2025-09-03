const Course = require('../models/course')
const userServices = require('../services/userServices')
const Problem = require('../models/problem')
const Errors = require('../utils/errors')

const getCourses = async () => {
  const courses = await Course.find({}).populate('problems', { question: 1 })
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

  return savedCourse.toJSON()
}

const deleteCourse = async ({ userId, courseId }) => {
  const savedUser = await userServices.getUserById(userId)

  const savedCourse = await getCourseById(courseId)

  if (String(savedCourse.user) !== String(userId)) {
    throw new Errors.ForbiddenError('user id does not match')
  }

  await Problem.deleteMany({ course: savedCourse._id })

  await Course.findByIdAndDelete(courseId)
  savedUser.courses = savedUser.courses
    .filter(cid => String(cid) !== String(courseId))
  await savedUser.save()

  return { success: true }
}

const updateCourse = async ({ title, courseCode, courseId, userId, studentId,  }) => {
  const requester = await userServices.getUserById(userId)
  if (!requester) throw new Errors.NotFoundError('requester not found')

  const course = await getCourseById(courseId)

  const addStudentBothSides = async (targetStudentId) => {
    const student = await userServices.getUserById(targetStudentId)
    if (!student) throw new Errors.NotFoundError('student not found')
    
    if (!course.students.some(id => String(id) === String(student._id))) {
      course.students = course.students.concat(student._id)
    }

    if (!student.courses.some(id => String(id) === String(course._id))) {
      student.courses = student.courses.concat(course._id)
      await student.save()
    }
  }

  if (requester.userType === 'teacher') {
    if (String(course.user) !== String(requester._id)) {
      throw new Errors.ForbiddenError('You do not own this course')
    }

    if (typeof title === 'string' && title) course.title = title
    if (typeof courseCode === 'string'&& courseCode) course.courseCode = courseCode
  
    if (studentId) {
      await addStudentBothSides(studentId)
    }
  
    await course.save()
    return course.toJSON()
  }

  if (requester.userType === 'student') {
    if (title || courseCode) {
      throw new Errors.ForbiddenError('Students cannot edit course fields')
    }

    if (!studentId || String(studentId) !== String(requester._id)) {
      throw new Errors.ForbiddenError('Students can only add themselves to course')
    }

    await addStudentBothSides(requester._id)
    await course.save()
    return course.toJSON()
  }

  throw new Errors.ForbiddenError('Unauthorized action')
}

module.exports = {
  getCourses,
  getCourseById,
  createCourse,
  deleteCourse,
  updateCourse,
}