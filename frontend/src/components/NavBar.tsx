import { NavLink } from "react-router-dom"
import type { CurrentUser } from "../App"

interface NavBarProps {
  user: CurrentUser | null,
  logout: () => void,
}

const NavBar = (props: NavBarProps) => {

  return (
    <nav>
      <h2>Logo</h2>
      <ul>
        <li>
          {props.user === null
          ? <NavLink to="/">
            Home
          </NavLink>
          : <NavLink to='/dashboard'>  
            Dashboard
          </NavLink>}
        </li>
        {props.user === null
          ? <li>
              <NavLink to='/login'>  
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