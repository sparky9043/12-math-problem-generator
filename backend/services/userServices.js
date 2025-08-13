const User = require('../models/user')

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

module.exports = { getUsers, getUserById }