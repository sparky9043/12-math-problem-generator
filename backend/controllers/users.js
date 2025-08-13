const usersRouter = require('express').Router()
const User = require('../models/user')
const userServices = require('../services/userServices')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (request, response, next) => {
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

module.exports = usersRouter