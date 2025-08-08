import { NavLink, Outlet } from "react-router-dom"

const DashBoard = () => {
  return (
    <div className="h-7/8" id='hello'>
      <div>
        <ul>
          <li>
            <NavLink to='problems'>
              Problems
            </NavLink>
          </li>
          <li>
            <NavLink to='create'>
              Create Problems
            </NavLink>
          </li>
        </ul>
        <Outlet />
      </div>
    </div>
  )
}

export default DashBoard