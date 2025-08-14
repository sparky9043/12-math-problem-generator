import { NavLink } from "react-router-dom"
import useCurrentUser from "../hooks/useCurrentUser"

interface NavBarProps {
  logout: () => void,
}

const NavBar = (props: NavBarProps) => {
  const { currentUser: user } = useCurrentUser()
  
  return (
    <nav className="flex justify-between p-8 bg-emerald-300 h-1/8 items-center">
      <h2>Logo</h2>
      <ul className="flex gap-4 items-center">
        <li>
          
          {user && <div className="font-semibold">logged in as: {user.name}</div>}
        </li>
        <li>
          {user === null
          ? <NavLink to="/" className="hover:text-emerald-900">
            Home
          </NavLink>
          : <NavLink to='/dashboard' className="hover:bg-emerald-200 active:bg-emerald-100 px-3 py-2 rounded cursor-pointer">  
            Dashboard
          </NavLink>}
        </li>
        {user === null
          ? <li>
              <NavLink to='/login' className="hover:text-emerald-900">  
                Login
              </NavLink>
            </li>
          : <div>
            <div>
              <button
                className="hover:bg-emerald-200 active:bg-emerald-100 px-3 py-2 rounded cursor-pointer"
                onClick={props.logout}
              >Logout</button>
            </div>
          </div>
        }
      </ul>
    </nav>
  )
}

export default NavBar