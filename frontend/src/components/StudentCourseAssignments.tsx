import { useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import assignmentServices from '../services/assignments'
import LoadingSpinner from './LoadingSpinner'
import type { Assignment } from '../types/types'
import useCurrentUser from '../hooks/useCurrentUser'

const StudentCourseAssignments = () => {
  const { id: courseId } = useParams()
  const { currentUser: currentStudent } = useCurrentUser()
  const navigate = useNavigate()
  const { data: assignmentData, isLoading: assignmentIsLoading, isPending } = useQuery({
    queryFn: () => assignmentServices.getAssignmentsByCourseId(courseId!),
    queryKey: ['assignments'],
    enabled: !!courseId,
  })

  if (assignmentIsLoading || isPending) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    )
  }

  const assignments:Assignment[] = assignmentData!

  if (!assignments.length) {
    return (
      <div>
        Your teacher has not assigned any work yet...
      </div>
    )
  }

  const assignmentCompleteCheck = (assignment: Assignment) => {
    return assignment?.studentsCompleted.map(s => s.studentId).includes(currentStudent ? currentStudent.id : '')
  }

  return (
    <div className='p-2'>
      <div>
        The checkmark ✅ means you already completed the assignment
      </div>
      <ul>
        {assignments.map(assignment => 
          <li key={assignment.id} className='rounded p-1'>
            {assignmentCompleteCheck(assignment) ? '✅' : null } {assignment.assignmentTitle}
            <button
              className='border-2 mx-4 p-1 rounded'
              onClick={() => navigate(`${assignment.assignmentTitle}`)}
            >
              {assignmentCompleteCheck(assignment) ? 'view' : 'start'}
            </button>
          </li>
        )}
      </ul>
      List of assignments for each course
    </div>
  )
}

export default StudentCourseAssignments