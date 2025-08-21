const CreateCourse = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  return (
    <form onSubmit={handleSubmit}>
      Create Course Form
    </form>
  )
}

export default CreateCourse