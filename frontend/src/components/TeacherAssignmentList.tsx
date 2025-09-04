import { Outlet } from 'react-router-dom'
import ProblemsList from './ProblemsList'

const TeacherAssignmentList = () => {
  return (
    <div>
      <ProblemsList />
      <Outlet />
    </div>
  )
}

export default TeacherAssignmentList