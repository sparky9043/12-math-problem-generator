const Problem = require('../models/problem')
const jwt = require('jsonwebtoken')
const configs = require('../utils/configs')
const userServices = require('./userServices')
const courseServices = require('./courseServices')

const getAll = async () => {
  const problems = await Problem.find({})
    .populate('course', { title: 1 })
    .populate('user', { username: 1 })
  return problems
}

const getProblem = async (id) => {
  const problem = await Problem.findById(id)
    .populate('course', { title: 1 })
    .populate('user', { username: 1 })
  return problem
}

const createNewProblem = async (request, response) => {
  const body = request.body

  const decodedToken = jwt.verify(request.token, configs.SECRET_KEY)

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  
  const user = await userServices.getUserById(decodedToken.id)

  if (!user) {
    return response.status(404).json({ error: 'user not found' })
  }

  const course = await courseServices.getCourseById(body.course)

  if (!course) {
    return response.status(404).json({ error: 'course not found' })
  }

  const problem = new Problem({
    subject: body.subject,
    branch: body.branch,
    topic: body.topic,
    question: body.question,
    choices: body.choices,
    answer: body.answer,
    course: course._id,
    user: user._id
  })

  const savedProblem = await problem.save()
  course.problems = course.problems.concat(savedProblem._id)
  await course.save()

  return savedProblem
}

const deleteProblem = async (request, response) => {
  const decodedToken = jwt.verify(request.token, configs.SECRET_KEY)
  const user = await userServices.getUserById(decodedToken.id)

  const problem = await Problem.findById(request.params.id)

  if (!problem) {
    return response.status(404).json({ error: 'Problem not found' })
  }

  if (problem.user.toString() !== user._id.toString()) {
    return response.status(403).json({ error: 'Not authorized to delete this problem' })
  }

  await Problem.findByIdAndDelete(request.params.id)
  user.problems = user.problems.filter(problemId => problemId.toString() !== request.params.id)
  
  await user.save()
}

const updateProblem = async (request, response) => {
  const decodedToken = jwt.verify(request.token, configs.SECRET_KEY)

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'invalid token' })
  }
  
  const problem = await getProblem(request.params.id)

  if (!problem) {
    return response.status(404).json({ error: 'Problem not found' })
  }

  if  (problem.user.toString() !== decodedToken.id) {
    return response.status(403).json({ error: 'Not authorized to update this problem!' })
  }

  const body = request.body

  problem.subject = body.subject
  problem.branch = body.branch
  problem.topic = body.topic
  problem.question = body.question
  problem.choices = body.choices
  problem.answer = body.answer

  await problem.save()
  return problem
}

module.exports = { getAll, createNewProblem, getProblem, deleteProblem, updateProblem }