import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { Outlet } from "react-router-dom"
import courseServices, { setToken } from '../services/courses'
import LoadingSpinner from "./LoadingSpinner"
import useCurrentUser from "../hooks/useCurrentUser"
import type { Problem } from "./ProblemsList"
import { NavLink } from 'react-router-dom'
import toast from 'react-hot-toast'

interface Course {
  createdAt: string,
  id: number,
  title: string,
  user: string,
  problems: Problem[]
}

const CoursesList = () => {
  const navigate = useNavigate()
  const { currentUser } = useCurrentUser()
  const coursesResults = useQuery({
    queryFn: courseServices.getAllCourses,
    queryKey: ['courses'],
  })
  const client = useQueryClient()
  const deleteMutation = useMutation({
    mutationFn: courseServices.deleteCourse,
    mutationKey: ['courses'],
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['courses'] })
    }
  })

  if (deleteMutation.isPending) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    )
  }

  const buttonStyles = "border-2 rounded border-emerald-800 p-2 text-sm"

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
        <button
          className="border-2 px-2 py-1 rounded"
          onClick={() => navigate('/dashboard/create')}
        >
          create course
        </button>
      </div>
    )
  }

  const handleDeleteCourse = async (id: string) => {
    try {
      if (currentUser) {
        if (window.confirm('are you sure you want to delete this course?')) {
          setToken(currentUser?.token)
          deleteMutation.mutate(id)
        } else {
          throw new Error('Delete cancelled')
        }
      }
    } catch (exception) {
      if (exception instanceof Error) {
        toast.error(exception.message)
        throw exception
      }
    }
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
          <NavLink
            className={buttonStyles}
            to={`/dashboard/problemform/${course.id}`}
          >
            create problem
          </NavLink>
          <button
            className={buttonStyles}
            onClick={() => handleDeleteCourse(String(course.id))}
          >
            delete course
          </button>
          {course.problems.length > 0 && <NavLink
            className={buttonStyles}
            to={`${course.id}`}
            // onClick={() => navigate(`${course.id}`)}
          >
            view problems
          </NavLink>}
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