import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { Outlet } from "react-router-dom"
import courseServices, { setToken } from '../services/courses'
import LoadingSpinner from "./LoadingSpinner"
import useCurrentUser from "../hooks/useCurrentUser"
import type { Problem } from '../types/types'
import toast from 'react-hot-toast'
import Button from "./Button"

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
        <Button
          variant='primary'
          onClick={() => navigate('/dashboard/create')}
        >
          create course
        </Button>
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
        {coursesByUser.map(course => <li key={course.id} className="flex gap-10 items-center rounded-xl p-4 bg-emerald-300">
          <div>
            <h3>
              {course.title}
            </h3>
            <p>
              Problems Created: {course.problems.length}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <Button
              variant='primary'
              size='sm'
              onClick={() => navigate(`/dashboard/problemform/${course.id}`)}
            >
              create problem
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => handleDeleteCourse(String(course.id))}
            >
              delete course
            </Button>
            {course.problems.length > 0 && <Button
              variant="primary"
              size="sm"
              onClick={() => navigate(`${course.id}`)}
            >
              view problems
            </Button>}
          </div>
        </li>)}
      </ul>
      <div className="my-2">
        {createCourseLink()}
      </div>
      <Outlet />
    </div>
  )
}

export default CoursesList