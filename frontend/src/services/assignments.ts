import axios from 'axios'

interface ProblemsObject {
  problems: string[]
  courseId: string,
  assignmentTitle: string,
}

const baseUrl = '/api/assignments'

let token:string

export const setToken = (inputToken: string) => {
  token = `Bearer ${inputToken}`
}

const getAssignments = async () => {
  const response = await axios.get(baseUrl)

  return response.data
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

export default { getAssignments, createAssignment }