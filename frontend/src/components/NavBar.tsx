import { NavLink } from "react-router-dom"
import styled from "styled-components"
import type { CurrentUser } from "../App"

interface NavBarProps {
  user: CurrentUser | null,
  logout: () => void,
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
  align-items: center;
`

const StyledButton = styled.button`
  border: none;
  background-color: lightgrey;
  padding: .5rem 1rem;
  border-radius: 5px;

  &:hover {
    background-color: grey;
    cursor: pointer;
  }
`

const NavBar = (props: NavBarProps) => {

  return (
    <Navigation>
      <h2>Logo</h2>
      <UnorderedList>
        <li>
          {props.user === null
          ? <NavLink to="/">
            Home
          </NavLink>
          : <NavLink to='/dashboard'>  
            Dashboard
          </NavLink>}
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
            <div>
              current user: {props.user.name}
              <StyledButton onClick={props.logout}>Logout</StyledButton>
            </div>
          </div>
        }
      </UnorderedList>
    </Navigation>
  )
}

export default NavBar