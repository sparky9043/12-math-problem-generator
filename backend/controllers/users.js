const usersRouter = require('express').Router()
const User = require('../models/user')
// const Problem = require('../models/problem')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  return response.json(users)
})

usersRouter.get('/:id', async (request, response) => {
  const user = await User.findById(request.params.id)
  return response.json(user)
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  const passwordHash = await bcrypt.hash(password, 10)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  return response.status(201).json(savedUser)
})

module.exports = usersRouter