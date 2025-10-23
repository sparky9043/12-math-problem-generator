const { describe, test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const helper = require('./helper')

const api = supertest(app)
const baseUrl = '/api/users'

beforeEach(async () => {
  const passwordHash = await bcrypt.hash('password123', 10)

  const users = helper.defaultUsers.map(user => ({ ...user, passwordHash }))

  await User.deleteMany({})
  await User.insertMany(users)
})

describe('GET Request', () => {
  test('returns all users and should be the same as default users', async () => {
    const response = await api
      .get(baseUrl)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.length, helper.defaultUsers.length)

    const usernames = response.body.map(u => u.username)

    assert(usernames.includes(helper.defaultUsers[0].username))
  })
})

after(async () => {
  await mongoose.connection.close()
})