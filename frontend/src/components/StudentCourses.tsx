import { useNavigate } from 'react-router-dom'
import useCurrentUser from '../hooks/useCurrentUser'
import { useQuery } from '@tanstack/react-query'
import userServices from '../services/users'
import LoadingSpinner from './LoadingSpinner'

const StudentCourses = () => {
  const { currentUser: user } = useCurrentUser()
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

  return (
    <div className='p-2'>
      {isCourseEmpty && noCoursesMessage()}
      <div>
        <button className='border-2 px-2 py-1 rounded'>
          add new course
        </button>
      </div>
    </div>
  )
}

export default StudentCourses