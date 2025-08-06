import { NavLink } from "react-router-dom"
import styled from "styled-components"

const Navigation = styled.nav`
  border: 2px solid green;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const UnorderedList = styled.ul`
  display: flex;
`

const NavBar = () => {

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
        <li>
          <NavLink to='/login'>  
            Login
          </NavLink>
        </li>
      </UnorderedList>
    </Navigation>
  )
}

export default NavBar