const coursesRouter = require('express').Router()
const courseServices = require('../services/courseServices')
const middleware = require('../utils/middleware')

coursesRouter.get('/', async (_request, response, next) => {
  try {
    const courses = await courseServices.getCourses()
    return response.json(courses)
  } catch (error) {
    next(error)
  }
})

coursesRouter.get('/:id', async (request, response, next) => {
  try {
    const course = await courseServices.getCourseById(request.params.id)
    return response.json(course)
  } catch (error) {
    next(error)
  }
})

coursesRouter.post('/', middleware.userExtractor, async (request, response, next) => {
  try {
    const { title, courseCode } = request.body
  
    const savedCourse = await courseServices.createCourse({
      title,
      courseCode,
      userId: request.user.id,
    })
  
    return response.status(201).json(savedCourse)
  } catch (error) {
    next(error)
  }
})

coursesRouter.delete('/:id', middleware.userExtractor, async (request, response, next) => {
  try {
    const result = await courseServices.deleteCourse({ userId: request.user.id, courseId: request.params.id })
  
    return response.status(200).json(result)
  } catch (error) {
    next(error)
  }
})

coursesRouter.put('/:id', middleware.userExtractor, async (request, response) => {
  const { title, courseCode, studentId } = request.body

  const savedCourse = await courseServices.updateCourse({ 
    title, courseCode, courseId: request.params.id, userId: request.user.id, studentId
   })

  return response.status(201).json(savedCourse)
})

module.exports = coursesRouter