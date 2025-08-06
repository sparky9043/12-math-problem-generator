import axios from 'axios'

const baseUrl = '/api/problems'

let token

export const setToken = (inputToken: string) => {
  token = `Bearer ${inputToken}`
}

const getProblems = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export default { getProblems }