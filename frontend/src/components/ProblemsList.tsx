import { useQuery } from "@tanstack/react-query"
import { Outlet, useNavigate } from "react-router-dom"
import type { CurrentUser } from "../App"
import problemService from '../services/problems'
import Error from "./Error"
import LoadingSpinner from "./LoadingSpinner"

interface HomepageProps {
  user: CurrentUser | null
}

export interface Problem {
  answer: string,
  branch: string,
  choices: string[],
  id: string,
  question: string,
  subject: string,
  topic: string,
  user: string,
}

const ProblemsList = (props: HomepageProps) => {
  const navigate = useNavigate()
  const problemsListResult = useQuery({
    queryFn: problemService.getProblems,
    queryKey: ['problems'],
    retry: 3,
  })

  if (problemsListResult.isLoading) {
    return (
      <div className="w-dvh">
        <LoadingSpinner />
      </div>
    )
  } else if (problemsListResult.isError)  {
    const errorMessage = problemsListResult.failureReason?.message

    return (
      <div className="w-dvh">
        <Error message={errorMessage} onRetry={() => problemsListResult.refetch()} />
      </div>
    )
  }

  const problems: Problem[] = problemsListResult.data

  const problemsByUser = problems.filter(problem => {
    if (problem !== null && props.user !== null) {
      return problem.user === props.user.id
    }
  })

  const convertToNumberString = (index: number): string => {
    return String(index + 1)
  }

  if (problemsByUser.length === 0) {
    return (
      <div>
        <p>You have not created any problems yet!</p>
        <button
          onClick={() => navigate('/dashboard/create')}
        >create problems</button>
      </div>
    )
  }

  const handleSeeDetails = (id: string) => {
    navigate(`${id}`)
  }

  return (
    <div className="overflow-auto w-full p-4 flex gap-2">
      <ul className="flex flex-col gap-4">
      {problemsByUser.map((problem, index) => <li key={problem.id}>
          <h3>
            <button
              className="mr-2 font-semibold px-2 py-1 rounded border border-emerald-700 text-emerald-500 hover:bg-emerald-200 hover:cursor-pointer hover:text-emerald-300"
              onClick={() => handleSeeDetails(problem.id)}
            >
              see details
            </button>
            <span>
              {convertToNumberString(index).concat('.')} {problem.question}
            </span>
          </h3>
        </li>)
      }
      </ul>
      <Outlet />
    </div>
  )
}

export default ProblemsList