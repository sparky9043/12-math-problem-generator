import { useQuery } from '@tanstack/react-query'
import assignmentServices from '../services/assignments'
import { Outlet } from 'react-router-dom'
import LoadingSpinner from './LoadingSpinner'
import type { Assignment } from '../types/types'
import useCurrentUser from '../hooks/useCurrentUser'
import { convertToChar } from '../utils/helper'

const TeacherAssignmentList = () => {
  const { currentUser } = useCurrentUser()
  const assignmentResponse = useQuery({
    queryFn: assignmentServices.getAssignments,
    queryKey: ['assignments']
  })

  if (currentUser?.userType !== 'teacher') {
    return (
      <div>
        This view is for teachers only!
      </div>
    )
  }

  if (assignmentResponse.isLoading) {
    return <LoadingSpinner />
  }

  const assignments: Assignment[] = assignmentResponse.data

  const assignmentsByUser = assignments.filter(assignment => assignment.teacher === currentUser.id)

  if (assignmentsByUser.length === 0) {
    return (
      <div>
        <p>You have 0 assignments! Go back to the My Courses page to create assignments now!</p>
      </div>
    )
  }

  console.log(assignmentsByUser)

  return (
    <div>
      {assignmentsByUser.map(assignment => <div
        className='p-2 my-1'
        key={assignment.id}
      >
        <h2>
          {assignment.assignmentTitle}
        </h2>
        <div>
          {assignment.problems.map(problem => <div key={problem.id}>
              {problem.question}

              {problem.choices.map((choice, index) =>
                <div key={choice}>
                  {convertToChar(Number(index)).concat('.')}  {choice}
                </div>)}
          </div>)}
        </div>
      </div>)}
      <Outlet />
    </div>
  )
}

export default TeacherAssignmentList