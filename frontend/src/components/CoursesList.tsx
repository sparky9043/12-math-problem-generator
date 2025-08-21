import { NavLink, useMatch } from "react-router-dom"
import { Outlet } from "react-router-dom"

const CoursesList = () => {
  const match = useMatch('/dashboard/courses/create')

  const createCourseLink = () => {
    return (
      <div>
        {match
        ?
          <NavLink
            className="border-2"
            to="/dashboard/courses"
            >
            back
          </NavLink>
        :
          <NavLink
            className="border-2"
            to="create"
            >
            create course
          </NavLink>
        }
      </div>
    )
  }

  return (
    <div className="p-2">
      This is a list of courses
      <div>
        {createCourseLink()}
      </div>
      <Outlet />
    </div>
  )
}

export default CoursesList