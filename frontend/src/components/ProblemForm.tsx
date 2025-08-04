const ProblemForm = () => {

  const handleCreateProblem = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  return (
    <form onSubmit={handleCreateProblem}>
      <h2>enter the necessary information to create problem</h2>
    </form>
  )
}

export default ProblemForm