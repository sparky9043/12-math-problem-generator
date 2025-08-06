import { NavLink } from "react-router-dom"
import styled from "styled-components"
import type { User } from "../services/login"

interface NavBarProps {
  user: User | null,
}

const Navigation = styled.nav`
  display: flex;
  padding: 1rem 2rem;
  background-color: #b3f4dc;
  align-items: center;
  justify-content: space-between;
`

const UnorderedList = styled.ul`
  display: flex;
  gap: 2rem;
`

const NavBar = (props: NavBarProps) => {

  return (
    <Navigation>
      <h2>Logo</h2>
      <UnorderedList>
        <li>
          <NavLink to='/'>  
            Home
          </NavLink>
        </li>
        {/* <li>
          <NavLink to='/login'>  
            About
          </NavLink>
        </li> */}
        {props.user === null
          ? <li>
              <NavLink to='/login'>  
                Login
              </NavLink>
            </li>
          : <div>
            <p>Logged in as {props.user.username}</p>
          </div>
        }
      </UnorderedList>
    </Navigation>
  )
}

export default NavBar