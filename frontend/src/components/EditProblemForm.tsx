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

  return (
    <div>
      Editable Form
    </div>
  )
}

export default EditProblemForm