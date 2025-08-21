import { useMatch, useNavigate } from "react-router-dom"
import { Outlet } from "react-router-dom"

const CoursesList = () => {
  const match = useMatch('/dashboard/courses/create')
  const navigate = useNavigate()

  const createCourseLink = () => {
    return (
      <div>
        {match
        ?
          <button
            className="border-2"
            onClick={() => navigate(-1)}
          >
            back
          </button>
        :
          <button
            className="border-2 px-2 py-1 rounded"
            onClick={() => navigate('create')}
          >
            create course
          </button>
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