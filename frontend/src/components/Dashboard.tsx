import { NavLink, Outlet } from "react-router-dom"
import type { CurrentUser } from "../App"

interface DashboardProps {
  user: CurrentUser | null
}

const DashBoard = (props: DashboardProps) => {

  return (
    <div className="h-full" id='hello'>
      <div className="flex h-full">
        <ul className="w-1/5 h-full bg-emerald-700 text-emerald-50">
          <li className="p-2">
            <NavLink to='problems'>
              Problems
            </NavLink>
          </li>
          <li className="p-2">
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