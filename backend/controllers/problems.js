const problemsRouter = require('express').Router()
const problemServices = require('../services/problemServices')

problemsRouter.get('/', async (request, response) => {
  const problems = await problemServices.getAll()
  return response.json(problems)
})

problemsRouter.post('/', async (request, response) => {
  const savedProblem = await problemServices.createNewProblem(request.body, request.token)

  response.status(201).json(savedProblem)
})

module.exports = problemsRouter