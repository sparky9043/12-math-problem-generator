import axios from 'axios'

interface UserCredentials {
  username: string,
  name: string,
  password: string,
  userType: string,
}

const baseUrl = '/api/users'

const createNewUser = async (credentials: UserCredentials) => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { createNewUser }