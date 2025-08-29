import axios from 'axios'

let token:string

interface Course {
  title: String,
  courseCode: String,
}

export const setToken = (inputToken: string) => {
  token = `Bearer ${inputToken}`
}

const baseUrl = '/api/courses'

const getAllCourses = async () => {
  const response = await axios.get(baseUrl)
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

export default { getAllCourses, createCourse }