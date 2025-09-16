import { useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import assignmentServices from '../services/assignments'
import LoadingSpinner from './LoadingSpinner'
import type { Assignment } from '../types/types'
import { useState } from 'react'
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
  const [isFinished, setIsFinished] = useState<boolean>(false)
  const [correctQuestions, setCorrectQuestions] = useState<string[]>([])
  const { currentUser: studentId } = useCurrentUser()
  const navigate = useNavigate()
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
    try {
      if (isFinished) throw new Error('you already finished this assignment')

      const formData = new FormData(event.currentTarget);

      if (targetAssignmentProblems) {
        for (const problem of targetAssignmentProblems) {
          if (problem.answer === formData.get(problem.id)) {
            setCorrectQuestions(questionIds => [...questionIds, problem.id])
          }
        }
      }
      setIsFinished(true)
    } catch (error) {
      if (error instanceof Error) {
        console.log('Error: ', error.message)
        toast.error(`Error: ${error.message}`)
      }
    }
  };

  if (studentId && targetAssignment?.studentsCompleted.map(s => s.studentId).includes(studentId.id)) {
    return (
      <div>
        You already finished this assignment!
        <button
          className='border-2 bg-green-300 rounded py-1 px-2 hover:cursor-pointer active:bg-green-400'
          onClick={() => navigate(-1)}
        >
          go back
        </button>
      </div>
    )
  }

  return (
    <div>
      {isFinished && `You got ${correctQuestions.length} questions correct!`}
      <form onSubmit={handleSubmitAssignment}>
        {targetAssignmentProblems?.map((problem, index) => <div key={problem.id}>
          {index + 1}. {problem.question}
            <ul>
              {problem.choices.map((choice) => <li key={choice} className='flex items-center justify-center'>
                <input
                  type='radio'
                  name={problem.id}
                  value={choice}
                  className={`border-2 p-4 rounded-full checked:bg-amber-600  disabled:border-gray-300 ${choice !== problem.answer ? 'checked:disabled:bg-red-400': 'checked:disabled:bg-green-400'}`}
                  id={`${problem.id}-${choice}`}
                  disabled={isFinished}
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
          disabled={isFinished}
        >
          complete assignment
        </button>
      </form>
        {
          isFinished
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