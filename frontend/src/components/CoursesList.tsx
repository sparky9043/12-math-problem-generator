import { useQuery } from "@tanstack/react-query"
import { useMatch, useNavigate } from "react-router-dom"
import { Outlet } from "react-router-dom"
import courseServices from '../services/courses'
import LoadingSpinner from "./LoadingSpinner"
import useCurrentUser from "../hooks/useCurrentUser"

interface Course {
  createdAt: string,
  id: number,
  title: string,
  user: string,
}

const CoursesList = () => {
  const match = useMatch('/dashboard/courses/create')
  const navigate = useNavigate()
  const { currentUser } = useCurrentUser()
  const coursesResults = useQuery({
    queryFn: courseServices.getAllCourses,
    queryKey: ['courses'],
  })

  if (coursesResults.isLoading) {
    return <LoadingSpinner />
  }

  if (!currentUser) {
    navigate('/login')
  }

  const courses: Course[] = coursesResults.data

  const coursesByUser = courses.filter(course => course?.user === currentUser?.id)

  const createCourseLink = () => {
    return (
      <div>
        {match
        ?
          <button
            className="border-2"
            onClick={() => navigate(-1)}
          >
            back
          </button>
        :
          <button
            className="border-2 px-2 py-1 rounded"
            onClick={() => navigate('create')}
          >
            create course
          </button>
        }
      </div>
    )
  }

  return (
    <div className="p-2">
      <h2>Courses List</h2>
      <ul>
        {coursesByUser.map(course => <li key={course.id}>
          <h3>
            {course.title}
          </h3>
        </li>)}
      </ul>
      <div>
        {createCourseLink()}
      </div>
      <Outlet />
    </div>
  )
}

export default CoursesList