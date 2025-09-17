const Assignment = require('../models/assignment')
const Errors = require('../utils/errors')
const courseServices = require('./courseServices')
const userServices = require('./userServices')
const Problem = require('../models/problem')

const getAssignments = async () => {
  const assignments = await Assignment.find({}).populate('problems', { question: 1, choices: 1, answer: 1 })
  return assignments
}

const getAssignmentById = async (id) => {
  const assignment = await Assignment.findById(id).populate('problems', { question: 1, choices: 1, answer: 1 })

  if (!assignment) {
    throw new Errors.NotFoundError('assignment not found')
  }

  return assignment
}

const createAssignment = async ({ assignmentTitle, courseId, userId, problems }) => {
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
    assignmentTitle,
    course: savedCourse._id,
    teacher: savedUser._id,
    problems: savedProblems.map(problem => problem._id)
  })

  await savedAssignment.save()

  return savedAssignment.toJSON()
}

const updateAssignment = async ({ assignmentId, studentId, correctProblems }) => {
  const savedAssignment = await getAssignmentById(assignmentId)
  if (correctProblems.length > 0) {
    const savedStudent = await userServices.getUserById(studentId)
    const savedProblems = await Problem.find({ _id: { $in: correctProblems } })

    if (!savedAssignment.studentsCompleted.map(s => String(s?.studentId)).includes(studentId)) {
      savedAssignment.studentsCompleted.push({
        studentId: savedStudent._id,
        correctProblems: savedProblems.map(p => p._id)
      })
    } else {
      throw new Errors.ForbiddenError('you already completed this assignment')
    }
    await savedAssignment.save()
  }

  return savedAssignment
}

module.exports = { getAssignments, getAssignmentById, createAssignment, updateAssignment }