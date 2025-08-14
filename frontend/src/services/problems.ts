import axios from 'axios'

interface Problem {
  answer: string,
  branch: string,
  choices: string[],
  question: string,
  subject: string,
  topic: string,
}

const baseUrl = '/api/problems'

let token:string

export const setToken = (inputToken: string) => {
  token = `Bearer ${inputToken}`
}

const getProblems = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createProblem = async (problem: Problem) => {
  const config = {
    headers: {
      authorization: token
    }
  }

  const response = await axios.post(baseUrl, problem, config)
  return response.data
}

export default { getProblems, createProblem }