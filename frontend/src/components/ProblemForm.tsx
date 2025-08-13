import useInput from "../hooks/useInput"


const ProblemForm = () => {
  const subject = useInput('')
  const branch = useInput('')
  const topic = useInput('')
  const question = useInput('')
  const answer = useInput('')
  const inputStyles = "border-2 rounded border-emerald-700 hover:border-emerald-500 px-0.5 py-1 focus:outline-emerald-800"

  const handleCreateProblem = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  return (
    <div className="px-2 py-4">
      <form onSubmit={handleCreateProblem} className="w-full">
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
    </div>
  )
}

export default ProblemForm