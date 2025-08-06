import { Outlet } from "react-router-dom"
import styled from "styled-components"
import Footer from "./Footer"

const Sticky = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`

const DashBoardDiv = styled.div`
  display: flex;
`

const Menu = styled.div`
  width: 20%;
`

const DashBoard = () => {
  return (
    <>
      <Sticky id="hello">
        <DashBoardDiv>
          <Menu>
            <p>Menu</p>
          </Menu>
          <Outlet />
        </DashBoardDiv>
      </Sticky>
      <Footer />
    </>
  )
}

export default DashBoard