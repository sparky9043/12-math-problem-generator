const problemsRouter = require('express').Router()
const problemServices = require('../services/problemServices')

problemsRouter.get('/', async (_request, response, next) => {
  try {
    const problems = await problemServices.getAll()

    return response.json(problems)
  } catch (error) {
    next(error)
  }
})

problemsRouter.post('/', async (request, response, next) => {
  try {
    const savedProblem = await problemServices.createNewProblem(request.body, request.token)

    return response.status(201).json(savedProblem)
  } catch (error) {
    next(error)
  }
})

module.exports = problemsRouter