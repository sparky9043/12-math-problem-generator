import axios from 'axios'

let token:string

interface Course {
  title: string,
  courseCode: string,
}

interface StudentCourseObject {
  studentId: string,
  courseId: string,
}

// interface Problem {
//   id: string,
// }

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

const addCourse = async (courseObject: StudentCourseObject) => {
  const config = {
    headers: {
      authorization: token
    }
  }

  const updatedCourse = await axios.put(`${baseUrl}/${courseObject.courseId}`, courseObject, config)

  return updatedCourse
}

export default { getAllCourses, createCourse, getCourseById, deleteCourse, addCourse }