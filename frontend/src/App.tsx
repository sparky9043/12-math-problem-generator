import { useEffect, useState } from "react"
import { Navigate, Route, Routes, useNavigate } from "react-router-dom"
import LoginForm from "./components/LoginForm"
// import ProblemsList from "./components/ProblemsList"
import DashBoard from "./components/Dashboard"
import HomePage from "./components/HomePage"
import NavBar from "./components/NavBar"
import loginService, { type User } from './services/login'

const App = () => {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const currentUserJSON = localStorage.getItem('mathAppCurrentUserJSON')
    if (currentUserJSON) {
      const currentUser = JSON.parse(currentUserJSON)
      setUser(currentUser)
    }

  }, [])

  const onLogin = async (credential: User) => {
    const newUser = await loginService.login(credential)
    setUser(newUser)
    localStorage.setItem('mathAppCurrentUserJSON', JSON.stringify(newUser))
    navigate('/')
  }

  return (
    <div>
      <NavBar user={user} />
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
