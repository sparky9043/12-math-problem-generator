require('dotenv').config()

const MONGODB_URI = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI

const PORT = 3001

const SECRET_KEY = process.env.SECRET

module.exports = { MONGODB_URI, PORT, SECRET_KEY }