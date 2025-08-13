const Problem = require('../models/problem')
const jwt = require('jsonwebtoken')
const configs = require('../utils/configs')
const userServices = require('./userServices')

const getAll = async () => {
  const problems = await Problem.find({})
  return problems
}

const getProblem = async (id) => {
  const problem = await Problem.findById(id)
  return problem
}

const createNewProblem = async (request) => {
  const body = request.body

  const decodedToken = jwt.verify(request.token, configs.SECRET_KEY)
  
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const user = await userServices.getUserById(decodedToken.id)

  const problem = new Problem({
    subject: body.subject,
    branch: body.branch,
    topic: body.topic,
    question: body.question,
    choices: body.choices,
    answer: body.answer,
    user: user._id
  })

  const savedProblem = await problem.save()
  user.problems = user.problems.concat(savedProblem._id)
  await user.save()

  return savedProblem
}

module.exports = { getAll, createNewProblem, getProblem }