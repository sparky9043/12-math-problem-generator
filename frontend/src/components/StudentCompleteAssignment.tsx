import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import assignmentServices from '../services/assignments'
import LoadingSpinner from './LoadingSpinner'
import type { Assignment } from '../types/types'

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

  const handleSubmitAssignment = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    if (targetAssignmentProblems) {
      for (const problem of targetAssignmentProblems) {
        console.log(problem.answer === formData.get(problem.id))
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmitAssignment}>
        {targetAssignmentProblems?.map((problem, index) => <div key={problem.id}>
          {index + 1}. {problem.question}
            <ul>
              {problem.choices.map((choice) => <li key={choice} className='flex items-center justify-center'>
                <input
                  type='radio'
                  name={problem.id}
                  value={choice}
                  className='border-2 p-4 rounded-full checked:bg-amber-600'
                  id={`${problem.id}-${choice}`} />
                <label
                  htmlFor={`${problem.id}-${choice}`}
                  className='text-left'
                >
                  {choice}
                </label>
              </li>)}
            </ul>
            <button type='submit'>
              complete assignment
            </button>

        </div>)}
      </form>
    </div>
  )
}

export default StudentCompleteAssignment