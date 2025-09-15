import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import assignmentServices from '../services/assignments'
import LoadingSpinner from './LoadingSpinner'
import type { Assignment } from '../types/types'

const StudentCourseAssignments = () => {
  const { id: courseId } = useParams()

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

  return (
    <div>
      <ul>
        {assignments.map(assignment => 
          <li key={assignment.id}>
            {assignment.assignmentTitle}
          </li>
        )}
      </ul>
      List of assignments for each course
    </div>
  )
}

export default StudentCourseAssignments