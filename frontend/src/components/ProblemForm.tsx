import { useNavigate } from "react-router-dom"
import useInput from "../hooks/useInput"
import problemServices from '../services/problems'

const ProblemForm = () => {
  const subject = useInput('')
  const branch = useInput('')
  const topic = useInput('')
  const question = useInput('')
  const answer = useInput('')
  const inputStyles = "border-2 rounded border-emerald-700 hover:border-emerald-500 px-0.5 py-1 focus:outline-emerald-800"
  const navigate = useNavigate()

  const handleCreateProblem = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault()
      const newProblem = await problemServices.createProblem({
        subject: subject.value,
        branch: branch.value,
        topic: topic.value,
        question: question.value,
        answer: answer.value,
        choices: [],
      })
      navigate(`/dashboard/problems/${newProblem.id}`)
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error('Error: ', error)
      }
    }
  }

  return (
    <div className="px-2 py-4">
      <form onSubmit={handleCreateProblem} className="w-full flex flex-col gap-2 items-center">
        <div>
          <label>
            subject
          </label>
          <input className={inputStyles} {...subject} />
        </div>
        <div>
          <label>
            branch
          </label>
          <input className={inputStyles} {...branch} />
        </div>
        <div>
          <label>
            topic
          </label>
          <input className={inputStyles} {...topic} />
        </div>
        <div>
          <label>
            question
          </label>
          <input className={inputStyles} {...question} />
        </div>
        <div>
          <label>
            answer
          </label>
          <input className={inputStyles} {...answer} />
        </div>
        <button
          className="bg-emerald-100 px-2 py-1 rounded hover:bg-emerald-200 hover:cursor-pointer"
          type="submit"
        >
          create problem
        </button>
      </form>
    </div>
  )
}

export default ProblemForm