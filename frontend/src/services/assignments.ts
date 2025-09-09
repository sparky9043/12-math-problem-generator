import axios from 'axios'

interface ProblemsObject {
  problems: string[]
  courseId: string,
}

const baseUrl = '/api/assignments'

let token:string

export const setToken = (inputToken: string) => {
  token = `Bearer ${inputToken}`
}

const createAssignment = async (problemsObject: ProblemsObject) => {
  const config = {
    headers: {
      authorization: token
    }
  }

  const response = await axios.post(baseUrl, problemsObject, config)

  return response.data
}

export default { createAssignment }