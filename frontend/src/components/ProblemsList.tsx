import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Outlet, useNavigate, useParams } from "react-router-dom"
import problemService from '../services/problems'
import Error from "./Error"
import LoadingSpinner from "./LoadingSpinner"
import useCurrentUser from "../hooks/useCurrentUser"
import useInput from "../hooks/useInput"
import { useState } from "react"
import DropdownMenu from "./DropdownMenu"

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

const ProblemsList = () => {
  const { currentUser: user } = useCurrentUser()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const problemsListResult = useQuery({
    queryFn: problemService.getProblems,
    queryKey: ['problems'],
    retry: 3,
  })
  const filter = useInput('', 'text')
  const [filterType, setFilterType] = useState<string>('question')
  const { id } = useParams()
  const deleteProblemMutation = useMutation({
    mutationFn: problemService.deleteProblem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['problems'] })
    }
  })
  const isIdSelected = id !== undefined

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
    if (problem !== null && user !== null) {
      return problem.user === user.id
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

  const handleDelete = async (id: string) => {
    try {
      deleteProblemMutation.mutate(id)
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  const searchFunction = (filterType: string) => {
    if (filterType === 'question') {
      return (problem: Problem) => problem.question.toLowerCase().includes(filter.value)
    } else if (filterType === 'branch') {
      return (problem: Problem) => problem.branch.toLowerCase().includes(filter.value)
    } else {
      return (problem: Problem) => problem.topic.toLowerCase().includes(filter.value)
    }
  }

  const handleFilterTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterType(event.target.value)
  }

  const filteredList = [...problemsByUser].filter(searchFunction(filterType)) ?? [...problemsByUser]

  return (
    <div className="max-h-screen overflow-scroll p-4 flex flex-col gap-2 w-200">
      <h2 className="font-semibold text-xl">Problems</h2>

      {!isIdSelected
        ? 
          <div>
            <label
              htmlFor="filter-type"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              filter by:
            </label>
            <DropdownMenu
              options={['question', 'branch', 'topic']}
              optionValue={filterType}
              setOptionValue={handleFilterTypeChange}
            />
            <input
              className="border-2 border-emerald-800 rounded w-2/5 py-0.5 px-1"
              {...filter}
            />
          </div>
        : <p>Problem selected</p>
      }

      <div className="flex">
        <ul className="flex flex-col gap-4">
          {filteredList.map((problem, index) => <li key={problem.id}>
            <div>
              <button
                className="mr-2 font-semibold px-2 py-1 rounded border border-emerald-700 text-emerald-500 hover:bg-emerald-200 hover:cursor-pointer hover:text-emerald-300"
                onClick={() => handleSeeDetails(problem.id)}
              >
                see details
              </button>
              <span>
                {convertToNumberString(index).concat('.')} {problem.question}
              </span>
              <button
                className="text-sm font-semibold px-1 py-0.5 rounded border border-emerald-700 text-emerald-500 hover:bg-emerald-200 hover:cursor-pointer hover:text-emerald-300 ml-2"
                onClick={() => handleDelete(problem.id)}
              >delete</button>
            </div>
          </li>)
          }
        </ul>
        <Outlet />
      </div>
    </div>
  )
}

export default ProblemsList