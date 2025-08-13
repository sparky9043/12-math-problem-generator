const User = require('../models/user')
const bcrypt = require('bcrypt')

const getUsers = async () => {
  const users = await User.find({})
  return users
}

const getUserById = async (id) => {
  const user = await User.findById(id)

  if (!user) {
    return response.status(404).json({ error: 'user not found' })
  }

  return user
}

const createNewUser = async (body) => {
  const { username, name, password } = body

  const passwordHash = await bcrypt.hash(password, 10)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()
  return savedUser
}

module.exports = { getUsers, getUserById, createNewUser }