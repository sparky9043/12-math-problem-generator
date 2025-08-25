const coursesRouter = require('express').Router()

coursesRouter.get('/', async (request, response) => {
  console.log(request, response)
})

module.exports = coursesRouter