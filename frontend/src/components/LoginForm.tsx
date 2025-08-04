import { useState } from "react"
import { type User } from "../services/login"

interface LoginFormProps {
  login: (credentials: User) => void,
}

const LoginForm: React.FC<LoginFormProps> = ({ login }) => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    
    try {
      login({ username, password })
    } catch (exception) {
      console.log(exception)
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <h2>log in</h2>
      <div>
        <label>
          username
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          password
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </label>
      </div>
      <button type="submit">login</button>
    </form>
  )
}

export default LoginForm