import axios from 'axios'

let token:string

interface Course {
  title: string,
  courseCode: string,
}

interface CourseObject {
  courseCode: string,
  createdAt: string,
  id: string,
  problems: Problem[],
  students: string[],
  title: string,
  user: string,
}

interface Problem {
  id: string,
}

export const setToken = (inputToken: string) => {
  token = `Bearer ${inputToken}`
}

const baseUrl = '/api/courses'

const getAllCourses = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getCourseById = async (id: string) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const createCourse = async(course: Course) => {
  const config = {
    headers: {
      authorization: token
    }
  }

  const response = await axios.post(baseUrl, course, config)
  return response.data
}

const deleteCourse = async (id: string) => {
  const config = {
    headers: {
      authorization: token
    }
  }

  await axios.delete(`${baseUrl}/${id}`, config)
}

const updateCourse = async (courseObject: CourseObject) => {
  const config = {
    headers: {
      authorization: token
    }
  }

  const updatedCourse = await axios.put(`${baseUrl}/${courseObject.id}`, courseObject, config)

  return updatedCourse
}

export default { getAllCourses, createCourse, getCourseById, deleteCourse, updateCourse }