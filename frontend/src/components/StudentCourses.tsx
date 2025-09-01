import { useNavigate } from 'react-router-dom'
import useCurrentUser from '../hooks/useCurrentUser'
import { useQuery } from '@tanstack/react-query'
import userServices from '../services/users'
import LoadingSpinner from './LoadingSpinner'
import Togglable from './Togglable'
import { useState } from 'react'
import courseServices from '../services/courses'
import toast from 'react-hot-toast'

interface Course {
  courseCode: string,
  createdAt: string,
  id: string,
  problems: Problem[],
  students: Student[],
  tite: string,
  user: string,
}

interface Problem {
  id: string,
}

interface Student {
  id: string,
}

const StudentCourses = () => {
  const { currentUser: user } = useCurrentUser()
  const [courseCode, setCourseCode] = useState<string>('')
  const navigate = useNavigate()
  const studentResults = useQuery({
    queryFn: userServices.getStudents,
    queryKey: ['students']
  })

  if (user?.userType !== 'student') {
    return (
      <div>
        This is for students. Please logout and try again.
        <button onClick={() => navigate('/login')}></button>
      </div>
    )
  }

  if (studentResults.isLoading) {
    return (
      <LoadingSpinner />
    )
  }

  const students = studentResults.data

  const currentStudent = students?.find(student => student.id === user.id)

  const isCourseEmpty = !currentStudent?.courses.length
  
  const noCoursesMessage = () =>
      <div>
        You don't have any courses. Press the button below to add a course
      </div>

  const handleAddCourse = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const courses: Course[] = await courseServices.getAllCourses()
    const targetCourse = courses?.find(course => course.courseCode === courseCode)
    
    try {
      if (targetCourse) {
        console.log(targetCourse)
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
      {isCourseEmpty && noCoursesMessage()}
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