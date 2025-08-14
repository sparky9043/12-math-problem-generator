import { useQueryClient } from "@tanstack/react-query"
import { useNavigate, useParams } from "react-router-dom"
import type { Problem } from "./ProblemsList"

const ProblemDetails = () => {
  const client = useQueryClient()
  const problems: Problem[] | undefined = client.getQueryData(['problems'])
  const { id } = useParams()
  const navigate = useNavigate()

  if (!problems) {
    return (
      <div>
        You don't have any problems created!
      </div>
    )
  }
  const targetProblem = problems.find(problem => problem.id === id)

  console.log(targetProblem)

  if (!targetProblem) {
    return (
      <div>
        Error: Invalid id
      </div>
    )
  }

  const convertToChar = (index: number) => {
    return String.fromCharCode(index + 65)
  }
  
  return  (
    <div>
      <h2>Topic: {targetProblem.topic}</h2>
      <h3>Branch: {targetProblem.branch}</h3>
      <h3>{targetProblem.question}</h3>
      <ul>
        {targetProblem.choices.map((choice, index) => <li key={choice}>
          {convertToChar(index)}. {choice}
        </li>)}
      </ul>
      <p>Answer: {targetProblem.answer}</p>
    </div>
  )
}

export default ProblemDetails