import { useEffect, useState } from "react"
import { Navigate, Route, Routes, useNavigate } from "react-router-dom"
import LoginForm from "./components/LoginForm"
// import ProblemsList from "./components/ProblemsList"
import DashBoard from "./components/Dashboard"
import HomePage from "./components/HomePage"
import NavBar from "./components/NavBar"
import ProblemsList from "./components/ProblemsList"
import loginService, { type User } from './services/login'

interface NotificationObject {
  type: string,
  message: string,
}

export interface CurrentUser {
  username: string,
  id: string,
  token: string,
  name: string,
}

const App = () => {
  const [user, setUser] = useState<CurrentUser | null>(null)
  const [notification, setNotification] = useState<NotificationObject | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const currentUserJSON = localStorage.getItem('mathAppCurrentUserJSON')
    if (currentUserJSON) {
      const currentUser = JSON.parse(currentUserJSON)
      setUser(currentUser)
      setNotification({ type: 'success', message: 'saved user found!' })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }

  }, [])

  const onLogin = async (credential: User) => {
    const newUser = await loginService.login(credential)
    setUser(newUser)
    setNotification({ type: 'success', message: 'logged in successfully!' })
    setTimeout(() => {
        setNotification(null)
    }, 5000)
    localStorage.setItem('mathAppCurrentUserJSON', JSON.stringify(newUser))
    navigate('/')
  }

  const onLogout = () => {
    setUser(null)
    localStorage.removeItem('mathAppCurrentUserJSON')
    setNotification({ type: 'success', message: 'logged out successfully' })
    setTimeout(() => {
        setNotification(null)
    }, 5000)
    navigate('/')
  }

  return (
    <div>
      <NavBar user={user} logout={onLogout} />
      {notification ? <div className={notification.type}>{notification.message}</div> : null}
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate replace to="/dashboard" /> : <HomePage />}
        />
        <Route
          path="/dashboard"
          element={<DashBoard />}
        >
          <Route
            path="/dashboard/problems"
            element={<ProblemsList user={user} />}
          />
          <Route
            path="/dashboard/create"
            element={<p>Problem Form</p>}
          />
        </Route>
        <Route
          path="/login"
          element={user ? <Navigate to="/" /> : <LoginForm login={onLogin} />}
        />
      </Routes>
    </div>
  )
}

export default App
