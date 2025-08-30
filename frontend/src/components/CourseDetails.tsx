import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
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
  const { id: courseId } = useParams()
  const problemResult = useQuery({
    queryFn: problemServices.getProblems,
    queryKey: ['problems']
  })

  if (problemResult.isLoading) {
    return (
      <LoadingSpinner />
    )
  }

  const allProblems: Problem[]  = problemResult.data


  const problemsByCourse: Problem[] = allProblems.filter(problem => problem.course.id === courseId)

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