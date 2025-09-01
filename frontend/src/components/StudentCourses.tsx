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
  
  console.log(studentResults.data)


  return (
    <div>
      Student View

      <div>
        <button>
          add new course
        </button>
      </div>
    </div>
  )
}

export default StudentCourses