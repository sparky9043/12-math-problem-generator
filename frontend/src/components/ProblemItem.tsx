import { useState } from 'react'
import type { Problem } from '../types/types'
import useProblems from '../hooks/useProblems'

interface ProblemItemProps {
  problem: Problem,
  index: number,
}

const ProblemItem = (props: ProblemItemProps) => {
  const [isChecked, setIsChecked] = useState<boolean>(false)
  const { setProblems } = useProblems()

  const handleCheckProblem = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.currentTarget.checked)
    setProblems(problems => {
      if (!problems.find(problem => problem.id === props.problem.id)) {
        return problems.concat(props.problem)
      } else {
        return problems.filter(problem => problem.id !== props.problem.id)
      }
    })
  }

  return (
    <li
      className='p-4 my-1'
      key={props.problem.id}
    >
      <div>
        {`${props.index + 1}.`} {props.problem.question}
      </div>
      <div>
        Answer: {props.problem.answer}
      </div>
      <div className='flex justify-center align-center'>
        <label>
          include in assignment?
        </label>
        <input
          type='checkbox'
          className='border-2 p-2 checked:bg-emerald-200 rounded'
          onChange={handleCheckProblem}
          checked={isChecked}
        />
      </div>
    </li>
  )
}

export default ProblemItem