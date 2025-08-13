const userServices = require('../services/userServices')
const bcrypt = require('bcrypt')
const configs = require('../utils/configs')
const jwt = require('jsonwebtoken')

const isCredentialValid = async (request) => {
  const { username, password } = request.body

  const user = await userServices.getUserByUsername(username)

  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)
  
  if (!(user && passwordCorrect)) {
    return false
  }

  return user
}

const login = async (user) => {
  const userForToken = {
    user: user.username,
    id: user._id,
  }

  const token = jwt.sign(userForToken,
    configs.SECRET_KEY,
    { expiresIn: 60 * 60 },
  )

  const decodedToken = jwt.verify(token, configs.SECRET_KEY)

  return {
    token,
    username: user.username,
    name: user.name,
    id: user._id,
    expiresIn: decodedToken.exp
  }
}

module.exports = { isCredentialValid, login }