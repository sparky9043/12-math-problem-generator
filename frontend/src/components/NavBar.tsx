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
    <nav className="flex justify-between p-8 h-1/8 items-center bg-linear-to-r from-emerald-400 to-emerald-500 text-emerald-50 font-semibold text-shadow-md text-shadow-black tracking-wider">
      <Toaster />
      <h2>
        <div className="w-12">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="fill-emerald-50">
            <rect width="24" height="24" fill="transparent" />
            <path d="M21,16.5a1,1,0,0,1-.53.88l-7.9,4.44a1,1,0,0,1-1.14,0l-7.9-4.44A1,1,0,0,1,3,16.5v-9a1,1,0,0,1,.53-.88l7.9-4.44a1,1,0,0,1,1.14,0l7.9,4.44A1,1,0,0,1,21,7.5v9M12,4.15,5,8.09v7.82l7,3.94,7-3.94V8.09L12,4.15m0,2.08,4.9,2.83L12,11.89,7.1,9.06,12,6.23m5,8.66L13,17.2V13.62l4-2.31v3.58M11,17.2,7,14.89V11.31l4,2.31Z"/>
          </svg>
        </div>
      </h2>
      <ul className="flex gap-4 items-center">
        <li>
          {user && <div className="font-semibold">user type: {user.userType}</div>}
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
        <li>
          {user === null && 
            <NavLink to="/new" className="hover:text-emerald-800">
              New User
            </NavLink>
          }
        </li>
      </ul>
    </nav>
  )
}

export default NavBar