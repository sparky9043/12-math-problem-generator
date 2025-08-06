import { useState } from "react"
import styled from "styled-components"
import { type User } from "../services/login"

const Input = styled.input`
  border: none;
  box-shadow: 0 0 2px black;
  border-radius: 3px;
  padding: .4rem .3rem;
  margin-left: .5rem;
`

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1rem;
  gap: .5rem;
`

const StyledButton = styled.button`
  border: none;
  background-color: lightgrey;
  padding: .5rem 1rem;
  border-radius: 5px;

  &:hover {
    background-color: grey;
    cursor: pointer;
  }
`

interface LoginFormProps {
  login: (credentials: User) => void,
}

const LoginForm = (props: LoginFormProps) => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    
    try {
      props.login({ username, password })
    } catch (exception) {
      console.log(exception)
    }
  }

  return (
    <StyledForm onSubmit={handleLogin}>
      <h2>log in</h2>
      <div>
        <label>
          username
          <Input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          password
          <Input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </label>
      </div>
      <StyledButton type="submit">login</StyledButton>
    </StyledForm>
  )
}

export default LoginForm