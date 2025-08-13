const Problem = require('../models/problem')

const getAll = async () => {
  const problems = await Problem.find({})
  return problems;
}

module.exports = { getAll }