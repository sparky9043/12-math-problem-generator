const User = require('../models/user')
const Problem = require('../models/problem')
const bcrypt = require('bcrypt')

const getUsers = async () => {
  const users = await User.find({})
  return users
}

const getUserById = async (id) => {
  const user = await User.findById(id)

  return user
}

const getUserByUsername = async (username) => {
  const user = await User.findOne({ username })
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

const deleteUser = async (user) => {
  for (const id of user.problems) {
    await Problem.findByIdAndDelete(id)
  }

  await User.findByIdAndDelete(id)
}

module.exports = {
  getUsers,
  getUserById,
  getUserByUsername,
  createNewUser,
  deleteUser
}