import { useNavigate } from "react-router-dom"
import useInput from "../hooks/useInput"
import problemServices from '../services/problems'
import { useState } from "react"
import DropdownMenu from "./DropdownMenu"
import toast from "react-hot-toast"
import { AxiosError } from "axios"

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

      if (!choices.includes(answer.value)) {
        throw new Error('Make sure that the answer is one of the choices')
      }

      const newProblem = await problemServices.createProblem({
        subject: subject.value,
        branch: branch.value,
        topic: topic.value,
        question: question.value,
        answer: answer.value,
        choices: choices,
        id: '',
      })

      navigate(`/dashboard/problems/${newProblem.id}`)
      toast.success('Problem created!')
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error('Error: Make sure all forms are filled and the question is not duplicated')
        throw error
      } else if (error instanceof Error) {
        toast.error('Error: ' + error.message)
        throw error
      }
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
          <input className={inputStyles} {...subject} required />
        </div>
        <div>
          <label>
            branch
          </label>
          <input className={inputStyles} {...branch} required />
        </div>
        <div>
          <label>
            topic
          </label>
          <input className={inputStyles} {...topic} required />
        </div>
        <div>
          <label>
            question
          </label>
          <input className={inputStyles} {...question} required />
        </div>
        <div>
          <label>
            answer
          </label>
          <input className={inputStyles} {...answer} required />
        </div>
        <div>
          <p>How many choices do you want your question to have?</p>
        </div>
        {/* design from https://www.material-tailwind.com/docs/html/select */}
        <DropdownMenu
          options={['1', '2', '3', '4']}
          optionValue={String(choiceNumbers)}
          setOptionValue={handleOptionChange}
        />
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