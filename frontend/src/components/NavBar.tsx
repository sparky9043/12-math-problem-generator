import { NavLink } from "react-router-dom"
import type { CurrentUser } from "../App"

interface NavBarProps {
  user: CurrentUser | null,
  logout: () => void,
}

const NavBar = (props: NavBarProps) => {

  return (
    <nav className="flex justify-between p-8 bg-emerald-300 h-1/8">
      <h2>Logo</h2>
      <ul className="flex gap-4">
        <li>
          {props.user === null
          ? <NavLink to="/" className="hover:text-emerald-900">
            Home
          </NavLink>
          : <NavLink to='/dashboard'>  
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
              current user: {props.user.name}
              <button onClick={props.logout}>Logout</button>
            </div>
          </div>
        }
      </ul>
    </nav>
  )
}

export default NavBar