import useCurrentUser from "../hooks/useCurrentUser"

const CreateCourse = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log('hello')
  }

  const { currentUser } = useCurrentUser()

  const user = {
    username: currentUser,
    id: currentUser?.id,
  }

  return (
    <form onSubmit={handleSubmit}>
      Create Course Form
      <div>
        <label></label>
        <input />
      </div>
      <div>
        <button
          className="border-2 p-1"
          type='submit'
          >
          submit
        </button>
      </div>
    </form>
  )
}

export default CreateCourse