import { NavLink } from "react-router-dom"
import useCurrentUser from "../hooks/useCurrentUser"
import { useEffect } from "react"
import { Toaster } from "react-hot-toast"

interface NavBarProps {
  logout: () => void,
}

const NavBar = (props: NavBarProps) => {
  const { currentUser: user } = useCurrentUser()
  const isExpired = user?.expiresIn && user?.expiresIn * 1000 - Date.now() <= 0

  useEffect(() => {
    if (isExpired) {
      props.logout()
    }

  }, [props, isExpired])

  return (
    <nav className="flex justify-between p-8 bg-emerald-300 h-1/8 items-center">
      <Toaster />
      <h2>Logo</h2>
      <ul className="flex gap-4 items-center">
        <li>
          
          {user && <div className="font-semibold">user type: {user.userType}</div>}
        </li>
        <li>
          {user === null && 
            <NavLink to="/new" className="hover:text-emerald-800">
              create new account
            </NavLink>
          }
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