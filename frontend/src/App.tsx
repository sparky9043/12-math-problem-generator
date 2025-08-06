import { useState } from "react"
import { Navigate, Route, Routes, useNavigate } from "react-router-dom"
import LoginForm from "./components/LoginForm"
// import ProblemsList from "./components/ProblemsList"
import DashBoard from "./components/Dashboard"
import HomePage from "./components/HomePage"
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
            element={user ? <Navigate replace to="/dashboard" /> : <HomePage />}
          />
          <Route
            path="/dashboard"
            element={<DashBoard />}
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
