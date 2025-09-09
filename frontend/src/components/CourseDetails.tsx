import { useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import problemServices from '../services/problems'
import LoadingSpinner from './LoadingSpinner'
import ProblemItem from './ProblemItem'
import type { Problem } from './ProblemsList'

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
      </div>
    )
  }

  return (
    <div>
      <ul>
        {problemsByCourse.map((problem, index) =>
          <ProblemItem key={problem.id} problem={problem} index={Number(index)} />
        )}
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