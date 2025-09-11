import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useNavigate, useParams } from "react-router-dom"
import type { Problem } from '../types/types'
import { useState } from "react"
import EditProblemForm from "./EditProblemForm"
import problemServices from '../services/problems'
import toast from "react-hot-toast"

const ProblemDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [showEditForm, setShowEditForm] = useState<boolean>(false)
  const queryClient = useQueryClient()

  const { data: problems, isLoading, isError } = useQuery({
    queryKey: ['problems'],
    queryFn: problemServices.getProblems
  })

  const updateProblemMutation = useMutation({
    mutationFn: problemServices.editProblem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['problems']})
    }
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError || !problems) {
    return <div>Error: could not load problems...</div>
  }

  const targetProblem: Problem = problems.find((problem: Problem) => problem.id === id)

  if (!problems) {
    return (
      <div>
        You don't have any problems created!
      </div>
    )
  }

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

  const handleBack = () => {
    navigate('/dashboard/problems')
  }

  const handleEdit = async (problemObject: Problem) => {
    try {
      updateProblemMutation.mutate(problemObject)
      setShowEditForm(false)
      toast.success('Problem updated!')
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message)
        toast.error(error.message)
        throw error
      }
    }
  }
  
  return  (
    <div className="basis-1/2 p-4 fixed top-20 right-10 min-w-1/9 max-w-2/9">
      <button className="hover:bg-emerald-100 px-1 py-2 rounded"
        onClick={handleBack}
      >
        &larr; back
      </button>
      <h2 className="font-semibold text-lg">Problem Details</h2>
      <h2>Topic: {targetProblem.topic}</h2>
      <h3>Branch: {targetProblem.branch}</h3>
      <h3>{targetProblem.question}</h3>
      <ul>
        {targetProblem.choices.map((choice, index) => <li key={choice}>
          {convertToChar(index)}. {choice}
        </li>)}
      </ul>
      <p>Answer: {targetProblem.answer}</p>
      <button
        className="mr-2 font-semibold px-2 py-1 rounded border border-emerald-700 text-emerald-500 hover:bg-emerald-200 hover:cursor-pointer hover:text-emerald-300"
        onClick={() => setShowEditForm(!showEditForm)}
      >{ showEditForm ? 'cancel' : 'edit' }</button>
      {showEditForm && <EditProblemForm problem={targetProblem} onEdit={handleEdit} />}
    </div>
  )
}

export default ProblemDetails