const Assignment = require('../models/assignment')

const getAssignments = async () => {
  const assignments = await Assignment.find({})
  return assignments
}

module.exports = { getAssignments }