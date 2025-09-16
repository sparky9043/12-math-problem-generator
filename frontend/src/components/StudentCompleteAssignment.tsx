import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import assignmentServices, { setToken } from '../services/assignments'
import LoadingSpinner from './LoadingSpinner'
import type { Assignment } from '../types/types'
import toast from 'react-hot-toast'
import useCurrentUser from '../hooks/useCurrentUser'

interface TargetProblem {
  answer: string,
  choices: string[],
  id: string,
  question: string,
}

const StudentCompleteAssignment = () => {
  const { id: courseId, assignment } = useParams()
  const { currentUser: studentId } = useCurrentUser()
  const navigate = useNavigate()
  const assignmentResult = useQuery({
    queryFn: () => assignmentServices.getAssignmentsByCourseId(courseId!),
    queryKey: ['assignments', courseId],
    enabled: !!courseId,
  })

  const assignmentMutation = useMutation({
    mutationFn: assignmentServices.updateAssignment,
    mutationKey: ['assignments'],
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['assignments'] })
    }
  })

  const client = useQueryClient()

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

  const isAssignmentComplete: boolean = (studentId && targetAssignment?.studentsCompleted.map(s => s.studentId).includes(studentId?.id)) ? true : false

  const handleSubmitAssignment = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (isAssignmentComplete) throw new Error('you already finished this assignment')
      const formData = new FormData(event.currentTarget);

      if (targetAssignmentProblems && studentId && targetAssignment) {
        setToken(studentId.token)
        const correctProblems: string[] = []
        for (const problem of targetAssignmentProblems) {
          if (problem.answer === formData.get(problem.id)) {
            correctProblems.push(problem.id)
          }
        }
        assignmentMutation.mutate({ assignmentId: targetAssignment?.id, studentId: studentId.id, correctProblems })
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log('Error: ', error.message)
        toast.error(`Error: ${error.message}`)
      }
    }
  };

  const correctProblems = targetAssignment?.studentsCompleted.find(s => s.studentId === studentId?.id)?.correctProblems

  return (
    <div>
      {isAssignmentComplete ? <h2>You already completed this assignment!</h2> : null}
      <form onSubmit={handleSubmitAssignment}>
        {targetAssignmentProblems?.map((problem, index) => <div key={problem.id}>
          {index + 1}. {problem.question}
          <div>
            {correctProblems?.includes(problem.id)
              ? <div className='text-green-400'>
              `You got this right! Correct Answer: ${problem.answer}`
              </div>
              : <div className='text-red-400'>
                `Wrong! Answer: ${problem.answer}`
              </div>
            }
          </div>
            <ul>
              {problem.choices.map((choice) => <li key={choice} className='flex items-center justify-center'>
                <input
                  type='radio'
                  name={problem.id}
                  value={choice}
                  className={`border-2 p-4 rounded-full checked:bg-amber-600  disabled:border-gray-300`}
                  id={`${problem.id}-${choice}`}
                  disabled={isAssignmentComplete}
                  required
                />
                <label
                  htmlFor={`${problem.id}-${choice}`}
                  className='text-left'
                >
                  {choice}
                </label>
              </li>)}
            </ul>
        </div>)}
        <button
          type='submit'
          className='border-2 bg-green-300 rounded py-1 px-2 hover:cursor-pointer disabled:hover:cursor-default disabled:bg-gray-300 disabled:text-gray-400'
          disabled={isAssignmentComplete}
        >
          complete assignment
        </button>
      </form>
        {
          isAssignmentComplete
            &&
            <button
              className='border-2 bg-green-300 rounded py-1 px-2 hover:cursor-pointer active:bg-green-400'
              onClick={() => navigate(-1)}
            >
              go back
            </button>
        }
    </div>
  )
}

export default StudentCompleteAssignment