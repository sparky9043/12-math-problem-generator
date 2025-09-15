import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import assignmentServices from '../services/assignments'
import LoadingSpinner from './LoadingSpinner'
import type { Assignment } from '../types/types'
import { convertToChar } from '../utils/helper'

interface TargetProblem {
  answer: string,
  choices: string[],
  id: string,
  question: string,
}

const StudentCompleteAssignment = () => {
  const { id: courseId, assignment } = useParams()

  const assignmentResult = useQuery({
    queryFn: () => assignmentServices.getAssignmentsByCourseId(courseId!),
    queryKey: ['assignments', courseId],
    enabled: !!courseId,
  })

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

  if (!targetAssignment) {
    <div>
      there was an error
    </div>
  }

  const targetAssignmentProblems: TargetProblem[] | undefined = targetAssignment && targetAssignment.problems

  console.log(targetAssignmentProblems)

  return (
    <div>
      {targetAssignmentProblems?.map(problem => <div key={problem.id}>
        {problem.question}

        <ul>
          {problem.choices.map((choice, index) => <li key={choice}>
            {convertToChar(Number(index))} {choice}
          </li>)}
        </ul>

      </div>)}
    </div>
  )
}

export default StudentCompleteAssignment