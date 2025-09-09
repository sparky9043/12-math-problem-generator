import type { Problem } from './CourseDetails'

interface ProblemItemProps {
  problem: Problem,
  index: number,
}

const ProblemItem = (props: ProblemItemProps) => {

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
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => console.log(event.currentTarget.checked)}
        />
      </div>
    </li>
  )
}

export default ProblemItem