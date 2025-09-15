import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import assignmentServices from '../services/assignments'
import problemServices from '../services/problems'
import LoadingSpinner from './LoadingSpinner'
import type { Assignment, Problem } from '../types/types'

const StudentCompleteAssignment = () => {
  const { id: courseId, assignment } = useParams()

  const assignmentResult = useQuery({
    queryFn: () => assignmentServices.getAssignmentsByCourseId(courseId!),
    queryKey: ['assignments', courseId],
    enabled: !!courseId,
  })

  const problemResult = useQuery({
    queryFn: problemServices.getProblems,
    queryKey: ['problems'],
  })

  if (problemResult.isLoading) {
    return (
      <LoadingSpinner />
    )
  }

  if (assignmentResult.isLoading) {
    return (
      <LoadingSpinner />
    )
  }

  const assignmentsByUser: Assignment[] | undefined = assignmentResult.data

  if (assignmentsByUser === undefined) {
    return (
      <div>
        Your teacher doesn't have any assignments created
      </div>
    )
  }

  const targetAssignment: Assignment | undefined = assignmentsByUser
    && assignmentsByUser.find(a => assignment && a.assignmentTitle.includes(assignment))

  if (targetAssignment) {
    <div>
      there was an error
    </div>
  }

  // const allProblems: Problem[] = problemResult.data

  // console.log(targetAssignment, problemsByCourseId)

  return (
    <div>
      Complete assignment
    </div>
  )
}

export default StudentCompleteAssignment