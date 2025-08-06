import { useState } from "react"
import { Navigate, Route, Routes, useNavigate } from "react-router-dom"
import Homepage from "./components/ProblemsList"
import LoginForm from "./components/LoginForm"
import loginService, { type User } from './services/login'

const App = () => {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  const onLogin = async (credential: User) => {
    const newUser = await loginService.login(credential)
    setUser(newUser)
    navigate('/')
  }

  return (
    <div>
        <Routes>
          <Route
            path="/"
            element={user ? <Homepage user={user} /> : <Navigate replace to="/login" />}
          />
          <Route
            path="/login"
            element={<LoginForm login={onLogin} />}
          />
        </Routes>
    </div>
  )
}

export default App
