import useInput from "../hooks/useInput"
import { type User } from "../services/login"

interface LoginFormProps {
  login: (credentials: User) => void,
}

const LoginForm = (props: LoginFormProps) => {
  const username = useInput('text')
  const password = useInput('password')
  console.log(username, password)

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!username.value || !password) return;
    
    try {
      props.login({ username: username.value, password: password.value })
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
            {...username}
            required
          />
        </label>
      </div>
      <div>
        <label>
          password
          <input
            {...password}
            required
          />
        </label>
      </div>
      <button type="submit">login</button>
    </form>
  )
}

export default LoginForm