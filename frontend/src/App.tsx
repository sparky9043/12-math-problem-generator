import { useEffect } from "react"
import { Navigate, Route, Routes, useNavigate } from "react-router-dom"
import DashBoard from "./components/Dashboard"
import Footer from "./components/Footer"
import HomePage from "./components/HomePage"
import LoginForm from "./components/LoginForm"
import NavBar from "./components/NavBar"
import ProblemForm from "./components/ProblemForm"
// import ProblemsList from "./components/ProblemsList"
import useNotification from "./hooks/useNotification"
import loginService, { type User } from './services/login'
// import ProblemDetails from "./components/ProblemDetails"
import useCurrentUser from "./hooks/useCurrentUser"
import { setToken } from "./services/problems"
import toast from 'react-hot-toast'
import CoursesList from "./components/CoursesList"
import CreateCourse from "./components/CreateCourse"
import CreateNewUser from './components/CreateNewUser'
import CourseDetails from './components/CourseDetails'

export interface CurrentUser {
  username: string,
  id: string,
  token: string,
  name: string,
  expiresIn: number,
  userType: string,
}

const App = () => {
  const { currentUser: user, dispatch } = useCurrentUser()
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
      dispatch({ type: 'addUser', payload: currentUser})
      setToken(currentUser.token)
      handleNotification(getNotificationMessage('success', 'saved user found!'), 5)
      toast.success('saved user found!', { id: currentUser.token })
    }
  }, [dispatch, handleNotification])

  const onLogin = async (credential: User) => {

    try {
      const newUser = await loginService.login(credential)
      dispatch({ type: 'addUser', payload: newUser})
      setToken(newUser.token)
      handleNotification(getNotificationMessage('success', 'logged in successfully!'), 5)
      localStorage.setItem('mathAppCurrentUserJSON', JSON.stringify(newUser))
      navigate('/')
      toast.success('Login Successful!')
    } catch (exception) {
      console.log(exception)
      toast.error('invalid username or password')
      handleNotification(getNotificationMessage('error', 'invalid username or password'), 5)
    }
  }

  const onLogout = () => {
    dispatch({ type: 'removeUser', payload: null })
    localStorage.removeItem('mathAppCurrentUserJSON')
    handleNotification(getNotificationMessage('success', 'logged out successfully'), 5)
    toast.success('logged out successfully')
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

  const userType = user?.userType

  return (
    <div className="text-emerald-950 h-dvh">
      <NavBar logout={onLogout} />
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
          path="/new"
          element={user ? <Navigate replace to="/" /> : <CreateNewUser />}
        />
        <Route
          path="/dashboard"
          element={<DashBoard />}
        >
          {/* <Route
            path="/dashboard/problems"
            element={<ProblemsList />}
          >
            <Route
              path="/dashboard/problems/:id"
              element={<ProblemDetails />}
            />
          </Route> */}
          <Route
            path="/dashboard/problemform/:id"
            element={<ProblemForm />}
          />
          <Route
            path="/dashboard/courses"
            element={
              userType === 'teacher'
              ? <CoursesList />
              : <p>student view</p>
            }
          />
          <Route
            path="/dashboard/courses/create"
            element={<CreateCourse />}
          />
          <Route
            path="/dashboard/courses/:id"
            element={<CourseDetails />}
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
