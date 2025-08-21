import { Outlet } from "react-router-dom"

const CoursesList = () => {
  return (
    <div>
      This is a list of courses
      <Outlet />
    </div>
  )
}

export default CoursesList