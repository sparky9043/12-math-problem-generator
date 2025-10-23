const { describe, test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const api = supertest(app)
const baseUrl = '/api/users'

beforeEach(async () => {
  const passwordHash = await bcrypt.hash('password123', 10)
  const defaultUser = { username: 'default', name: 'test user', userType: 'teacher', passwordHash }
  await User.deleteMany({})
  await User.insertMany([ { ...defaultUser } ])
})

describe('GET Request', () => {
  test('this is simply a test', async () => {
    const response = await api
      .get(baseUrl)

    console.log(response.body)

    assert.strictEqual(1, 1)
  })
})

after(async () => {
  await mongoose.connection.close()
})