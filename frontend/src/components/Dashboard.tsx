import { NavLink, Outlet, useMatch } from "react-router-dom"
import useCurrentUser from "../hooks/useCurrentUser"

const DashBoard = () => {
  const { currentUser } = useCurrentUser()
  const matchingParameter = useMatch('/dashboard')

  return (
    <div className="h-full">
      <div className="h-screen">
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
          <div>
            {matchingParameter &&
              <div className="p-2 flex flex-col gap-4">
                <p>Username: {currentUser && currentUser.username}</p>
                <p>Name: {currentUser && currentUser.name}!</p>
                <p>Use the menu on the left to navigate</p>
              </div>
            }
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashBoard