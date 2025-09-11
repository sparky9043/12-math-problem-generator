import { useQuery } from '@tanstack/react-query'
import assignmentServices from '../services/assignments'
import { Outlet } from 'react-router-dom'
import LoadingSpinner from './LoadingSpinner'
import type { Problem } from '../types/types'
import useCurrentUser from '../hooks/useCurrentUser'

interface Assignment {
  assignedAt: string,
  assignmentTitle: string,
  course: string,
  id: string,
  problems: Problem[],
  teacher: string,
}

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
      {assignmentsByUser.map(assignment => <li key={assignment.id}>
        {assignment.assignmentTitle}
        <ul>
          {assignment.problems.map(problem => <li key={problem.id}>
            <div>
              {problem.question}

              {problem.choices.map(choice => <li key={choice}>
                {choice}
              </li>)}
            </div>
          </li>)}
        </ul>
      </li>)}
      <Outlet />
    </div>
  )
}

export default TeacherAssignmentList