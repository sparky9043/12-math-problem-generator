import { useNavigate } from 'react-router-dom'
import useCurrentUser from '../hooks/useCurrentUser'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import LoadingSpinner from './LoadingSpinner'
import Togglable from './Togglable'
import { useState } from 'react'
import courseServices, { setToken } from '../services/courses'
import toast from 'react-hot-toast'
import Button from './Button'

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
    mutationFn: courseServices.addCourseByCode,
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

  const handleAddCourse = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setToken(user.token)
    
    try {
      if (!courseCode) throw new Error('enter a correct course code')

      addCourseMutations.mutate({ courseCode })
      setCourseCode('')
      toast.success('course added!')
    } catch (exception) {
      if (exception instanceof Error) {
        console.log(exception.message)
        toast.error(exception.message, { duration: 5000 })
      }
    }
  }

  const handleViewAssignment = (courseId: string) => {
    navigate(`${courseId}`)
  }

  console.log(enrolledCourses)

  return (
    <div className='p-2'>
      <div>
        <ul className='flex gap-4'>
          {
            enrolledCourses.map(course =>
              <li key={course.id} className='my-3'>
                <div className='border-2 p-4'>
                  <div>
                    <h2>
                      {course?.title}
                    </h2>
                  </div>
                  <div>
                    <Button
                      variant='primary'
                      onClick={() => handleViewAssignment(course.id)}
                      >
                      click to view
                    </Button>
                  </div>
                </div>
              </li>
            )
          }
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
                className='outline-2 outline-emerald-400 rounded px-1 py-0.5 hover:outline-emerald-500 focus:outline-emerald-700'
                value={courseCode}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setCourseCode(event.target.value)
                }
                required={true}
              />
            </div>
            <div>
              <Button
                variant='primary'
                type='submit'
              >
                add course
              </Button>
            </div>
          </form>
        </Togglable>
      </div>
    </div>
  )
}

export default StudentCourses