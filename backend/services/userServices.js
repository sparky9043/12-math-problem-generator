const User = require('../models/user')
const Problem = require('../models/problem')
const Course = require('../models/course')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const configs = require('../utils/configs')

const getUsers = async () => {
  const users = await User.find({}).populate('courses', { title: 1 })
  return users
}

const getUserById = async (id) => {
  const user = await User.findById(id).populate('courses', { title: 1 })
  return user
}

const getUserByUsername = async (username) => {
  const user = await User.findOne({ username })
  return user
}

const createNewUser = async (body) => {
  const { username, name, password, userType } = body

  const passwordHash = await bcrypt.hash(password, 10)

  const user = new User({
    username,
    name,
    passwordHash,
    userType,
  })

  const savedUser = await user.save()
  return savedUser
}

const deleteUser = async (request, response) => {
  const userToDelete = await getUserById(request.params.id)

  if (!userToDelete) {
    return response.status(404).json({ error: 'user not found' })
  }

  const decodedToken = jwt.verify(request.token, configs.SECRET_KEY)

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  } else if (decodedToken.id !== userToDelete.id.toString()) {
    return response.status(401).json({ error: 'unauthorized request detected' })
  }

  for (const course of userToDelete.courses) {
    const savedCourse = await Course.findById(course._id.toString())
    
    for (const problem of savedCourse.problems) {
      await Problem.findByIdAndDelete(problem._id.toString())
    }

    await Course.findByIdAndDelete(course._id.toString())
  }

  await User.findByIdAndDelete(request.params.id)
}

module.exports = {
  getUsers,
  getUserById,
  getUserByUsername,
  createNewUser,
  deleteUser,
}