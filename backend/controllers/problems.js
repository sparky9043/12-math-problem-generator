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
  const savedProblem = await problemServices.createNewProblem(request.body, request.token)

  response.status(201).json(savedProblem)
})

module.exports = problemsRouter