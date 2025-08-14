import { useParams } from "react-router-dom"

const ProblemDetails = () => {
  const x = useParams()

  console.log('hello', x)

  return  (
    <div>details</div>
  )
}

export default ProblemDetails