const usersRouter = require('express').Router()
const userServices = require('../services/userServices')

usersRouter.get('/', async (_request, response, next) => {
  try {
    const users = await userServices.getUsers()

    return response.json(users)
  } catch (error) {
    next(error)
  }
})

usersRouter.get('/:id', async (request, response, next) => {
  try {
    const user = await userServices.getUserById(request.params.id)
  
    if (!user) {
      return response.status(404).json({ error: 'user not found' })
    }

    return response.json(user)
  } catch (error) {
    next(error)
  }
})

usersRouter.post('/', async (request, response, next) => {
  try {

    const savedUser = await userServices.createNewUser(request.body)
    
    return response.status(201).json(savedUser)

  } catch (error) {
    next(error)
  }
})

usersRouter.delete('/:id', async (request, response, next) => {
  try {
    const user = await userServices.getUserById(request.params.id)

    if (!user) {
      return response.status(404).json({ error: 'user not found' })
    }

    await userServices.deleteUser(user)

    return response.status(204).end()
  } catch (error) {
    next(error)
  }
})

module.exports = usersRouter