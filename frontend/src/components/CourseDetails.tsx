import { useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import problemServices from '../services/problems'
import LoadingSpinner from './LoadingSpinner'
import { useState } from 'react'

interface User {
  username: string,
  id: string,
}

interface Course {
  title: string,
  id: string,
}

export interface Problem {
  subject: string,
  branch: string,
  topic: string,
  question: string,
  choices: string[],
  answer: string,
  user: User,
  course: Course,
  id: string,
}

const CourseDetails = () => {
  const navigate = useNavigate()
  const { id: courseId } = useParams()
  const problemResult = useQuery({
    queryFn: problemServices.getProblems,
    queryKey: ['problems']
  })
  const [problemsForAssignment, setProblemsForAssignment] = useState<Problem[] | null>(null)
  
  const buttonStyles = "border-2 rounded border-emerald-800 p-2 text-sm"


  if (problemResult.isLoading) {
    return (
      <LoadingSpinner />
    )
  }

  const allProblems: Problem[]  = problemResult.data


  const problemsByCourse: Problem[] = allProblems.filter(problem => problem.course.id === courseId)

  if (problemsByCourse.length === 0) {
    return (
      <div>
        <p>
          You have no problems! Click the button to create problem
        </p>
      </div>
    )
  }

  console.log(problemsForAssignment)

  return (
    <div>
      <ul>
        {problemsByCourse.map((problem, index) =>
          <li
            className='p-4 my-1'
            key={problem.id}
          >
            <div>
              {`${index + 1}.`} {problem.question}
            </div>
            <div>
              Answer: {problem.answer}
            </div>
            <div className='flex justify-center align-center'>
              <label>
                include in assignment?
              </label>
              <input
                type='checkbox'
                className='border-2 p-2 checked:bg-emerald-200 rounded'
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => console.log(event.currentTarget.checked)}
              />
            </div>
          </li>)}
      </ul>
      <button
        className={buttonStyles}
        onClick={() => navigate(`/dashboard/problemform/${courseId}`)}
      >
        create problem
      </button>
      <button
        className={buttonStyles}
      >
        make assignment
      </button>
    </div>
  )
}

export default CourseDetails