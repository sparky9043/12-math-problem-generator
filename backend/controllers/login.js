const loginRouter = require('express').Router()
const userServices = require('../services/userServices')
const loginServices = require('../services/loginServices')
const configs = require('../utils/configs')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

loginRouter.post('/', async (request, response) => {
  const validUser = await loginServices.isCredentialValid(request)

  if (!validUser) {
    return response.status(400).json({ error: 'username or password invalid' })
  }

  const loginObject = await loginServices.login(validUser)

  return response.status(201).send(loginObject)
})

module.exports = loginRouter