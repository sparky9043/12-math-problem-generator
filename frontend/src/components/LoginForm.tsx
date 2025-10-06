import { useState } from "react"
import useInput from "../hooks/useInput"
import { type User } from "../services/login"
import Button from "./Button"

interface LoginFormProps {
  login: (credentials: User) => void,
}

const LoginForm = (props: LoginFormProps) => {
  const username = useInput('')
  const password = useInput('', 'password')
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!username.value || !password.value) return;
    try {
      setIsLoading(true)
      props.login({ username: username.value, password: password.value })
    } catch (exception: unknown) {
      if (exception instanceof Error) {
        console.log("Hello",exception.message)
      }
    } finally {
      setIsLoading(false)
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
      <Button
        type="submit"
        disabled={isLoading}
      >login</Button>
    </form>
  )
}

export default LoginForm