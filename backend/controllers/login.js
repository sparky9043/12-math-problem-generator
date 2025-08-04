const loginRouter = require('express').Router()
const User = require('../models/user')
const configs = require('../utils/configs')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body

  const user = await User.findOne({ username })

  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(400).json({ error: 'user or password invalid' })
  }

  const userForToken = {
    user: user.username,
    id: user._id,
  }

  const token = jwt.sign(userForToken,
    configs.SECRET_KEY,
    { expiresIn: 60 * 60 },
  )

  response.status(201).send({ token, username: user.username, name: user.name, id: user._id })
})

module.exports = loginRouter