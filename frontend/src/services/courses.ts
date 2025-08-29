import axios from 'axios'

let token:string

const baseUrl = '/api/courses'

const getAllCourses = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createCourse = async() => {

}

export default { getAllCourses }