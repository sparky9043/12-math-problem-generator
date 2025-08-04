import axios from 'axios'

export interface User {
  username: string,
  password: string,
}

const baseUrl = '/api/login'

const login = async (credentials: User) => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { login }