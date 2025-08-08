import { NavLink, Outlet } from "react-router-dom"
import Footer from "./Footer"

const DashBoard = () => {
  return (
    <>
      <div>
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
      <Footer />
    </>
  )
}

export default DashBoard