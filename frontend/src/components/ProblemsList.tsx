import { useQuery } from "@tanstack/react-query"
import type { CurrentUser } from "../App"
import problemService from '../services/problems'

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
    queryKey: ['problems']
  })

  if (problemsListResult.isLoading) {
    return (
      <p>Waiting for problems to load...</p>
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
    <div>
      <ul>
      {problemsByUser.length > 0
        && problemsByUser.map(problem => <li key={problem.id}>
          <h3>
            {problem.question}
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