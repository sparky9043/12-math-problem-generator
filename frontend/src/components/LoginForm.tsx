import useInput from "../hooks/useInput"
import { type User } from "../services/login"

interface LoginFormProps {
  login: (credentials: User) => void,
}

const LoginForm = (props: LoginFormProps) => {
  const username = useInput('text')
  const password = useInput('password')

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!username.value || !password.value) return;
    
    try {
      props.login({ username: username.value, password: password.value })
    } catch (exception: unknown) {
      if (exception instanceof Error) {
        console.log(exception.message)
      }
    }
  }

  const inputStyles = "border-2 rounded border-emerald-700 hover:border-emerald-500 px-0.5 py-1 focus:outline-emerald-800"

  return (
    <form
      className="p-4"
      onSubmit={handleLogin}
    >
      <h2>log in</h2>
      <div>
        <label>
          username
          <input
            className={inputStyles}
            {...username}
            required
          />
        </label>
      </div>
      <div>
        <label>
          password
          <input
            className={inputStyles}
            {...password}
            required
          />
        </label>
      </div>
      <button
        className="px-2 py-1 rounded bg-emerald-700 text-emerald-100"
        type="submit"
      >login</button>
    </form>
  )
}

export default LoginForm