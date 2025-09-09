import { useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import problemServices from '../services/problems'
import LoadingSpinner from './LoadingSpinner'
import ProblemItem from './ProblemItem'
import type { Problem } from './ProblemsList'
import useProblems from '../hooks/useProblems'
import toast from 'react-hot-toast'
import { setToken } from '../services/assignments'
import useCurrentUser from '../hooks/useCurrentUser'
import assignmentServices from '../services/assignments'

const CourseDetails = () => {
  const navigate = useNavigate()
  const { id: courseId } = useParams()
  const problemResult = useQuery({
    queryFn: problemServices.getProblems,
    queryKey: ['problems']
  })
  const buttonStyles = "border-2 rounded border-emerald-800 p-2 text-sm"
  const { problems, setProblems } = useProblems()
  const { currentUser } = useCurrentUser()

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

  const handleCreateAssignment = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      if (!problems.length) {
        throw new Error('You need at least one problem to create assignment!')
      }
      
      if (currentUser && courseId) {
        setToken(currentUser?.token)
        assignmentServices.createAssignment({ problems: problems.map(problem => problem.id), courseId })
      }
      setProblems([])
      navigate('/dashboard/courses')
      toast.success('assignment created!')
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
        console.log(error)
      }
    }

  }

  return (
    <div>
      <ul>
        {problemsByCourse.map((problem, index) =>
          <ProblemItem key={problem.id} problem={problem} index={Number(index)} />
        )}
      </ul>
      {problems.length > 0 && <div>
        <p>Assignment Added</p>
        </div>
      }
      <button
        className={buttonStyles}
        onClick={() => navigate(`/dashboard/problemform/${courseId}`)}
      >
        create problem
      </button>
      <form onSubmit={handleCreateAssignment}>
        <button
          className={buttonStyles}
          type="submit"
        >
          make assignment
        </button>
      </form>
    </div>
  )
}

export default CourseDetails