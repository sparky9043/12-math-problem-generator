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

problemsRouter.get('/:id', async (request, response, next) => {
  try {
    const problem = await problemServices.getProblem(request.params.id)
    return response.status(201).json(problem)
  } catch (error) {
    next(error)
  }
})

problemsRouter.post('/', async (request, response, next) => {
  try {
    const savedProblem = await problemServices.createNewProblem(request)

    return response.status(201).json(savedProblem)
  } catch (error) {
    next(error)
  }
})

problemsRouter.delete('/:id', async (request, response, next) => {
  try {
    await problemServices.deleteProblem(request)

    return response.status(204).end()
  } catch (error) {
    next(error)
  }
})

problemsRouter.put('/:id', async (request, response, next) => {
  try {
    const updatedProblem = await problemServices.updateProblem(request, response)
    return response.status(201).json(updatedProblem)
  } catch (error) {
    next(error)
  }
})

module.exports = problemsRouter