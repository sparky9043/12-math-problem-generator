const Assignment = require('../models/assignment')
const Errors = require('../utils/errors')
const courseServices = require('./courseServices')
const userServices = require('./userServices')
const Problem = require('../models/problem')

const getAssignments = async () => {
  const assignments = await Assignment.find({})
  return assignments
}

const getAssignmentById = async (id) => {
  const assignment = await Assignment.findById(id)

  if (!assignment) {
    throw new Errors.NotFoundError('assignment not found')
  }

  return assignment.toJSON()
}

const createAssignment = async ({ courseId, userId, problems }) => {
  if (!problems || problems?.length === 0) {
    throw new Errors.ValidationError('you need at least one problem')
  }

  const savedCourse = await courseServices.getCourseById(courseId)

  const savedUser = await userServices.getUserById(userId)

  if (savedUser.userType !== 'teacher') {
    throw new Errors.ForbiddenError('only teachers can create assignments')
  }

  const savedProblems = await Problem.find({ _id: { $in: problems }, course: courseId })

  if (savedProblems.length !== problems.length) {
    throw new Errors.NotFoundError('ids do not match')
  }

  const savedAssignment = new Assignment({
    course: savedCourse._id,
    teacher: savedUser._id,
    problems: savedProblems.map(problem => problem._id)
  })

  await savedAssignment.save()

  return savedAssignment.toJSON()
}

module.exports = { getAssignments, getAssignmentById, createAssignment }