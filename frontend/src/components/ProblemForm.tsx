
const ProblemForm = () => {

  const handleCreateProblem = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  return (
    <form onSubmit={handleCreateProblem} className="w-full">
      {/* <LoadingSpinner /> */}
    </form>
  )
}

export default ProblemForm