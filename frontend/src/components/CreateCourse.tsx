const CreateCourse = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  return (
    <form onSubmit={handleSubmit}>
      Create Course Form

      <button
        className="border-2 p-1"
        type='submit'
      >
        submit
      </button>
    </form>
  )
}

export default CreateCourse