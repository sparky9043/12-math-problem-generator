import { useNavigate } from "react-router-dom"
import useInput from "../hooks/useInput"
import problemServices from '../services/problems'
import { useState } from "react"

const ProblemForm = () => {
  const subject = useInput('')
  const branch = useInput('')
  const topic = useInput('')
  const question = useInput('')
  const answer = useInput('')
  const inputStyles = "border-2 rounded border-emerald-700 hover:border-emerald-500 px-0.5 py-1 focus:outline-emerald-800"
  const navigate = useNavigate()
  const [choiceNumbers, setChoiceNumbers] = useState<number>(4)

  const handleCreateProblem = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault()
      const target = event.currentTarget
      const choices: string[] = []

      for (let i = 0; i < choiceNumbers; i++) {
        const value: string = target[`choice${String(i)}`].value

        if (!value) {
          throw new Error('Make sure all the choices are filled!')
        }

        choices.push(value)
      }
      
      const newProblem = await problemServices.createProblem({
        subject: subject.value,
        branch: branch.value,
        topic: topic.value,
        question: question.value,
        answer: answer.value,
        choices: choices,
      })

      navigate(`/dashboard/problems/${newProblem.id}`)
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  const choicesArray = Array.from({ length: choiceNumbers }, (_, i) => {
    return (<div>
      <input name={`choice${i}`} className="border-2 p-1 border-emerald-700 rounded" />
    </div>)
  })

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setChoiceNumbers(Number(event.target.value))
  }

  return (
    <div className="px-2 py-4">
      <form onSubmit={handleCreateProblem} className="w-full flex flex-col gap-2 items-center">
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
        <div>
          <p>How many choices do you want your question to have?</p>
        </div>
        {/* design from https://www.material-tailwind.com/docs/html/select */}
        <div className="w-full max-w-sm min-w-[200px]">      
          <div className="relative">
            <select
              className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer"
              value={String(choiceNumbers)}
              onChange={handleOptionChange}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.2" stroke="currentColor" className="h-5 w-5 ml-1 absolute top-2.5 right-2.5 text-slate-700">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
            </svg>
          </div>
        </div>
        {choicesArray.map((choice, i) => <div key={i}>
          choice: {i + 1} {choice}
        </div>)}
        <button
          className="bg-emerald-100 px-2 py-1 rounded hover:bg-emerald-200 hover:cursor-pointer"
          type="submit"
        >
          create problem
        </button>
      </form>
    </div>
  )
}

export default ProblemForm