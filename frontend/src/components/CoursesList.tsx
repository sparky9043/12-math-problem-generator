import { useQuery } from "@tanstack/react-query"
import { useMatch, useNavigate } from "react-router-dom"
import { Outlet } from "react-router-dom"
import courseServices from '../services/courses'
import LoadingSpinner from "./LoadingSpinner"
import useCurrentUser from "../hooks/useCurrentUser"
import type { Problem } from "./ProblemsList"

interface Course {
  createdAt: string,
  id: number,
  title: string,
  user: string,
  problems: Problem[]
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

  const courses: Course[] = coursesResults.data

  const coursesByUser = courses.filter(course => course?.user === currentUser?.id)

  const emptyCourseListMessage = () => 'You have no courses! Press the button below to start making new courses!'

  const createCourseLink = () => {
    return (
      <div>
        {coursesByUser.length === 0 && emptyCourseListMessage()}
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
      <ul className="flex flex-col gap-2">
        {coursesByUser.map(course => <li key={course.id} className="flex gap-10 items-center">
          <div>
            <h3>
              {course.title}
            </h3>
            <p>
              Problems Created: {course.problems.length}
            </p>
          </div>
          <button
            className="border-2 rounded border-emerald-800 p-2"
            onClick={() => navigate(`/dashboard/problemform/${course.id}`)}
          >
            create problems
          </button>
          <button
            onClick={() => navigate(`${course.id}`)}
          >
            view problems
          </button>
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