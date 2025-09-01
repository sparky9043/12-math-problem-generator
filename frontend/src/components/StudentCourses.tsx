import { useNavigate } from 'react-router-dom'
import useCurrentUser from '../hooks/useCurrentUser'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import LoadingSpinner from './LoadingSpinner'
import Togglable from './Togglable'
import { useState } from 'react'
import courseServices, { setToken } from '../services/courses'
import toast from 'react-hot-toast'

interface Course {
  courseCode: string,
  createdAt: string,
  id: string,
  problems: Problem[],
  students: string[],
  title: string,
  user: string,
}

interface Problem {
  id: string,
}

const StudentCourses = () => {
  const { currentUser: user } = useCurrentUser()
  const [courseCode, setCourseCode] = useState<string>('')
  const navigate = useNavigate()
  const courseResults = useQuery({
    queryFn: courseServices.getAllCourses,
    queryKey: ['courses']
  })
  const client = useQueryClient()

  const addCourseMutations = useMutation({
    mutationFn: courseServices.updateCourse,
    mutationKey: ['courses'],
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['courses' ]})
    }
  })

  if (user?.userType !== 'student') {
    return (
      <div>
        This is for students. Please logout and try again.
        <button onClick={() => navigate('/login')}></button>
      </div>
    )
  }

  if (courseResults.isLoading) {
    return (
      <LoadingSpinner />
    )
  }

  if (addCourseMutations.isPending) {
    return (
      <LoadingSpinner />
    )
  }

  const allCourses: Course[] = courseResults.data

  const enrolledCourses = allCourses.filter(
    course => course.students.includes(user.id))

  console.log(enrolledCourses)

  const handleAddCourse = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const courses: Course[] = await courseServices.getAllCourses()
    const targetCourse = courses?.find(course => course.courseCode === courseCode)
    setToken(user.token)
    
    try {
      if (targetCourse) {
        addCourseMutations.mutate({...targetCourse, students: [
          user.id,
        ]})
        setCourseCode('')
        toast.success('Added Course Successfully!')
      } else {
        throw new Error('Could not find target course')
      }
    } catch (exception) {
      if (exception instanceof Error) {
        console.log(exception.message)
        toast.error(exception.message, { duration: 5000 })
      }
    }
  }

  return (
    <div className='p-2'>
      <div>
        <ul>
          {enrolledCourses.map(course => <li key={course.id}>
            {course?.title}
          </li>)}
        </ul>
      </div>
      <div>
        <Togglable text='click to add new course'>
          <form
            onSubmit={handleAddCourse}
            className='flex flex-col gap-2 mb-2'
          >
            <div>
              <label htmlFor="course-code">course code</label>
              <input
                type="text"
                className='border-2 rounded px-1 py-0.5'
                value={courseCode}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setCourseCode(event.target.value)
                }
              />
            </div>
            <div>
              <button
                className='border-2 px-2 py-1 rounded'
                type='submit'
                >
                add course
              </button>
            </div>
          </form>
        </Togglable>
      </div>
    </div>
  )
}

export default StudentCourses