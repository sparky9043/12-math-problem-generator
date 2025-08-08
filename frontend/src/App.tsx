import { useEffect, useState } from "react"
import { Navigate, Route, Routes, useNavigate } from "react-router-dom"
import LoginForm from "./components/LoginForm"
// import ProblemsList from "./components/ProblemsList"
import DashBoard from "./components/Dashboard"
import HomePage from "./components/HomePage"
import NavBar from "./components/NavBar"
import ProblemsList from "./components/ProblemsList"
import useNotification from "./hooks/useNotification"
import loginService, { type User } from './services/login'

export interface CurrentUser {
  username: string,
  id: string,
  token: string,
  name: string,
}

const App = () => {
  const [user, setUser] = useState<CurrentUser | null>(null)
  const { notification, handleNotification } = useNotification()
  const navigate = useNavigate()

  useEffect(() => {
    const currentUserJSON = localStorage.getItem('mathAppCurrentUserJSON')
    if (currentUserJSON) {
      const currentUser = JSON.parse(currentUserJSON)
      setUser(currentUser)
      handleNotification({ type: 'success', message: 'saved user found!' }, 5)
    }
  }, [handleNotification])

  const onLogin = async (credential: User) => {

    try {
      const newUser = await loginService.login(credential)
      setUser(newUser)
      handleNotification({ type: 'success', message: 'logged in successfully!' }, 5)
      localStorage.setItem('mathAppCurrentUserJSON', JSON.stringify(newUser))
      navigate('/')
    } catch (exception) {
      handleNotification({ type: 'error', message: 'invalid username or password' }, 5)
    }
  }

  const onLogout = () => {
    setUser(null)
    localStorage.removeItem('mathAppCurrentUserJSON')
    handleNotification({ type: 'success', message: 'logged out successfully' }, 5)

    navigate('/')
  }

  return (
    <div className="text-emerald-950">
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
