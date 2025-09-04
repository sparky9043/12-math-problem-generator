const Assignment = require('../models/assignment')
const Errors = require('../utils/errors')

const getAssignments = async () => {
  const assignments = await Assignment.find({})
  return assignments
}

const getAssignmentById = async (id) => {
  const assignment = await Assignment.findById(id)

  if (!assignment) {
    throw new Errors.NotFoundError('assignment not found')
  }

  return assignment
}

module.exports = { getAssignments, getAssignmentById }