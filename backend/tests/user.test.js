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

  test('returns one user when requesting user with id', async () => {
    const response = await api
      .get(`${baseUrl}/${helper.defaultUsers[0]._id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.username, helper.defaultUsers[0].username)
  })

  test('returns 404 if user not found', async () => {
    const nonexistentId = '68805516a921ed387a948322'
    
    const response = await api
      .get(`${baseUrl}/${nonexistentId}`)
      .expect(404)
      .expect('Content-Type', /application\/json/)
    
    assert(response.body.error.includes('user not found'))
  })

  test('returns 400 if id is not formatted correctly', async () => {
    const malformattedId = 'malformattedId'

    const response = await api
      .get(`${baseUrl}/${malformattedId}`)
      .expect(400)
    
    assert(response.body.error.includes('malformatted id'))
  })
})

// describe('POST requests', () => {
//   test('')
// })

after(async () => {
  await mongoose.connection.close()
})