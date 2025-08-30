import { useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import problemServices from '../services/problems'
import LoadingSpinner from './LoadingSpinner'

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
        <button
          className={buttonStyles}
          onClick={() => navigate(`/dashboard/problemform/${courseId}`)}
        >
          create problem
        </button>
      </div>
    )
  }

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
          </li>)}
      </ul>
    </div>
  )
}

export default CourseDetails