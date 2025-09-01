import axios from 'axios'

interface UserCredentials {
  username: string,
  name: string,
  password: string,
  userType: string,
}

interface Course {
  title: string,
  id: string,
}

interface User {
  name: string,
  id: string,
  userType: string,
  username: string,
  courses: Course[],
}

const baseUrl = '/api/users'

const getTeachers = async () => {
  const response = await axios.get(baseUrl)

  const allUsers: User[] = response.data

  const teachersOnly = allUsers.filter(user => user.userType === 'teacher')
  
  return teachersOnly
}

const getStudents = async () => {
  const response = await axios.get(baseUrl)

  const allUsers: User[] = response.data

  const studentsOnly = allUsers.filter(user => user.userType === 'student')
  
  return studentsOnly
}

const createNewUser = async (credentials: UserCredentials) => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { createNewUser, getStudents, getTeachers }