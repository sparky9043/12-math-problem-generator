import { useEffect, useState } from "react"
import { Navigate, Route, Routes, useNavigate } from "react-router-dom"
import DashBoard from "./components/Dashboard"
import Footer from "./components/Footer"
import HomePage from "./components/HomePage"
import LoginForm from "./components/LoginForm"
import NavBar from "./components/NavBar"
import ProblemForm from "./components/ProblemForm"
import ProblemsList from "./components/ProblemsList"
import useNotification from "./hooks/useNotification"
import loginService, { type User } from './services/login'

export interface CurrentUser {
  username: string,
  id: string,
  token: string,
  name: string,
  expiresIn: number,
}

const App = () => {
  const [user, setUser] = useState<CurrentUser | null>(null)
  const { notification, handleNotification } = useNotification()
  const navigate = useNavigate()
  const getNotificationMessage = (type: 'success' | 'error', message: string) => {
    return {
      type,
      message
    }
  }
  
  useEffect(() => {
    const currentUserJSON = localStorage.getItem('mathAppCurrentUserJSON')
    if (currentUserJSON) {
      const currentUser = JSON.parse(currentUserJSON)
      setUser(currentUser)
      handleNotification(getNotificationMessage('success', 'saved user found!'), 5)
    }
  }, [handleNotification])

  const onLogin = async (credential: User) => {

    try {
      const newUser = await loginService.login(credential)
      setUser(newUser)
      handleNotification(getNotificationMessage('success', 'logged in successfully!'), 5)
      localStorage.setItem('mathAppCurrentUserJSON', JSON.stringify(newUser))
      navigate('/')
    } catch (exception) {
      handleNotification(getNotificationMessage('error', 'invalid username or password'), 5)
    }
  }

  const onLogout = () => {
    setUser(null)
    localStorage.removeItem('mathAppCurrentUserJSON')
    handleNotification(getNotificationMessage('success', 'logged out successfully'), 5)

    navigate('/')
  }

  interface NotificationStyles {
    success: string,
    error: string,
  }

  const messageStyles = {
    success: 'bg-emerald-200 p-2',
    error: 'bg-red-200 p-2',
  }

  const getNotificationStyles = (property: string) => {
    
    return messageStyles[property as keyof NotificationStyles]
  }

  return (
    <div className="text-emerald-950 h-dvh">
      <NavBar user={user} logout={onLogout} />
      {notification && notification.type
        ? <div
            className={getNotificationStyles(notification.type)}
            >
            {notification.message}
          </div>
        : null
      }
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
          >
            <Route
              path="/dashboard/problems/:id"
              element={<p>Problem Details</p>}
            />
          </Route>
          <Route
            path="/dashboard/create"
            element={<ProblemForm />}
          />
        </Route>
        <Route
          path="/login"
          element={user ? <Navigate to="/" /> : <LoginForm login={onLogin} />}
        />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
