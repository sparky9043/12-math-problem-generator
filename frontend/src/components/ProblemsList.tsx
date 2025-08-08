import { useQuery } from "@tanstack/react-query"
import type { CurrentUser } from "../App"
import problemService from '../services/problems'
import Error from "./Error"
import LoadingSpinner from "./LoadingSpinner"

interface HomepageProps {
  user: CurrentUser | null
}

interface Problem {
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
        <Error message={errorMessage} />
      </div>
    )
  }

  const problems: Problem[] = problemsListResult.data

  const problemsByUser = problems.filter(problem => {
    if (problem !== null && props.user !== null) {
      return problem.user === props.user.id
    }
  })

  const convertToCharacter = (index: number) => {
    return String.fromCharCode(65 + index)
  }

  return (
    <div className="overflow-auto w-full p-4">
      <ul className="flex flex-col gap-4">
      {problemsByUser.length > 0
        && problemsByUser.map((problem, index) => <li key={problem.id}>
          <h3>
            {String(index + 1).concat('.')} {problem.question}
          </h3>
          <ul>
            {problem.choices.map((choice, index) => <li key={choice}>
              <span>                
                {convertToCharacter(index)}. {choice}
              </span>
            </li>)}
          </ul>
          <p>
            Answer: {problem.answer}
          </p>
        </li>)
      }
      </ul>
    </div>
  )
}

export default ProblemsList