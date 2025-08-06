import { NavLink, Outlet } from "react-router-dom"
import styled from "styled-components"
import Footer from "./Footer"

const Sticky = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`

const DashBoardDiv = styled.div`
  display: flex;
  height: 100%;
`

const Menu = styled.ul`
  width: 20%;
  display: flex;
  flex-direction: column;
  background-color: #d4e9ff;
  height: 100%;
`

const MenuItem = styled.li`
  padding: 1rem;
`

const DashBoard = () => {
  return (
    <>
      <Sticky id="hello">
        <DashBoardDiv>
          <Menu>
            <MenuItem>
              <NavLink to='problems'>
                Problems
              </NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink to='create'>
                Create Problems
              </NavLink>
            </MenuItem>
          </Menu>
          <Outlet />
        </DashBoardDiv>
      </Sticky>
      <Footer />
    </>
  )
}

export default DashBoard