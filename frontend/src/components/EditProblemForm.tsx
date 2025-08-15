import type { Problem } from "./ProblemsList"

interface EditProblemFormProps {
  problem: Problem | null
}

const EditProblemForm = (props: EditProblemFormProps) => {
  if (!props.problem) {
    return (
      <div>
        invalid ID. Refresh the page to reload the problem correctly
      </div>
    )
  }

  console.log(props.problem)

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
      </form>

  )
}

export default EditProblemForm