import { useParams } from 'react-router-dom'

const StudentCompleteAssignment = () => {
  const { id: courseId, assignment } = useParams()

  console.log(courseId, assignment)

  return (
    <div>
      Complete assignment
    </div>
  )
}

export default StudentCompleteAssignment