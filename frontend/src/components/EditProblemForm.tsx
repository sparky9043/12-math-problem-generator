import useInput from "../hooks/useInput"
import type { Problem } from "./ProblemsList"

interface EditProblemFormProps {
  problem: Problem | null,
  onEdit: () => void
}

const EditProblemForm = (props: EditProblemFormProps) => {
  const subject = useInput(props.problem?.subject)
  const branch = useInput(props.problem?.branch)
  const topic = useInput(props.problem?.topic)
  const question = useInput(props.problem?.question)
  const answer = useInput(props.problem?.answer)
  const inputStyles = "border-2 rounded border-emerald-700 hover:border-emerald-500 px-0.5 py-1 focus:outline-emerald-800"

  if (!props.problem) {
    return (
      <div>
        invalid ID. Refresh the page to reload the problem correctly
      </div>
    )
  }

  const handleEdit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  return (
      <form onSubmit={handleEdit}>
        <h3>Edit Problem</h3>
        <button
          className="mr-2 font-semibold px-2 py-1 rounded border border-emerald-700 text-emerald-500 hover:bg-emerald-200 hover:cursor-pointer hover:text-emerald-300"
        >
          Edit Form
        </button>
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
      </form>

  )
}

export default EditProblemForm