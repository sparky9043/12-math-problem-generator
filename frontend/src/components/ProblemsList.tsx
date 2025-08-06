import { useQuery } from "@tanstack/react-query"
import styled from "styled-components"
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

const Scrollable = styled.ul`
  overflow: scroll;
  max-width: 100%;
  width: 100%;
  scrollbar-width: thin;
  scrollbar-color: blue green;
  max-height: 100%;
  padding: 0rem 2rem;
`

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

  return (
    <Scrollable>
      <ul>
      {problemsByUser.length > 0
        && problemsByUser.map(problem => <li key={problem.id}>
          <h3>
            {problem.question}
          </h3>
          <ul>
            {problem.choices.map(choice => <li key={choice}>
              <span>                
                {choice}
              </span>
            </li>)}
          </ul>
          <p>
            Answer: {problem.answer}
          </p>
        </li>)
      }
      </ul>
    </Scrollable>
  )
}

export default ProblemsList