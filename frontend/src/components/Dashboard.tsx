import { Outlet } from "react-router-dom"
import styled from "styled-components"

const Sticky = styled.div`
  display: flex;
  flex-direction: column;
`

const DashBoardDiv = styled.div`
  display: flex;
  min-height: auto;
  border: 2px solid green;
`

const Menu = styled.div`
  width: 20%;
`

const DashBoard = () => {
  return (
    <Sticky id="hello">
      <DashBoardDiv>
        <Menu>
          <p>Menu</p>
        </Menu>
        <Outlet />
      </DashBoardDiv>
      <p style={{ border: '2px solid blue' }}>Footer</p>
    </Sticky>
  )
}

export default DashBoard