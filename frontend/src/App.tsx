import { useEffect, useState } from "react"
import { Navigate, Route, Routes, useNavigate } from "react-router-dom"
import LoginForm from "./components/LoginForm"
// import ProblemsList from "./components/ProblemsList"
import styled from "styled-components"
import DashBoard from "./components/Dashboard"
import HomePage from "./components/HomePage"
import NavBar from "./components/NavBar"
import loginService, { type User } from './services/login'

interface NotificationObject {
  type: string,
  message: string,
}

export interface CurrentUser {
  username: string,
  password: string,
  token: string,
  name: string,
}

const Notification = styled.div`
  padding: 2rem;
`

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
    if (user) {
      setNotification({ type: 'success', message: `Welcome ${user.name}` })
      setTimeout(() => {
          setNotification(null)
      }, 5000)
    }
    localStorage.setItem('mathAppCurrentUserJSON', JSON.stringify(newUser))
    navigate('/')
  }

  const onLogout = () => {
    setUser(null)
    localStorage.removeItem('mathAppCurrentUserJSON')
    navigate('/')
  }

  return (
    <div>
      <NavBar user={user} logout={onLogout} />
      {notification ? <Notification>{notification.message}</Notification> : null}
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
