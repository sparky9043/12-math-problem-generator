const problemsRouter = require('express').Router()
const Problem = require('../models/problem')
const User = require('../models/user')
const configs = require('../utils/configs')
const problemServices = require('../services/problemServices')
const userServices = require('../services/userServices')
const jwt = require('jsonwebtoken')

problemsRouter.get('/', async (request, response) => {
  const problems = await problemServices.getAll()
  return response.json(problems)
})

problemsRouter.post('/', async (request, response) => {
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

  response.status(201).json(savedProblem)
})

module.exports = problemsRouter