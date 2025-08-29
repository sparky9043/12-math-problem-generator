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

  const inputStyles = "border-2 rounded border-emerald-700 hover:border-emerald-500 px-0.5 py-1 focus:outline-emerald-800"

  return (
    <form onSubmit={handleSubmit}>
      Create Course Form
      <div>
        <label>course title</label>
        <input className={inputStyles} />
      </div>
      <div>
        <label>course code</label>
        <input className={inputStyles} />
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