import { NavLink } from "react-router-dom"
import type { CurrentUser } from "../App"

interface NavBarProps {
  user: CurrentUser | null,
  logout: () => void,
}

const NavBar = (props: NavBarProps) => {

  return (
    <nav className="flex justify-between p-8 bg-emerald-300 h-1/8 items-center">
      <h2>Logo</h2>
      <ul className="flex gap-4 items-center">
        <li>
          
          {props.user && <div className="font-semibold">logged in as: {props.user.name}</div>}
        </li>
        <li>
          {props.user === null
          ? <NavLink to="/" className="hover:text-emerald-900">
            Home
          </NavLink>
          : <NavLink to='/dashboard' className="hover:bg-emerald-200 active:bg-emerald-100 px-3 py-2 rounded cursor-pointer">  
            Dashboard
          </NavLink>}
        </li>
        {props.user === null
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