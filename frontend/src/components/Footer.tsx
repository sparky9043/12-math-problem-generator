import styled from "styled-components"

const StickyFooter = styled.footer`
  padding: 1rem;
  background-color: #a7e8ca;
`

const Footer = () => {
  return (
    <StickyFooter>
      &copy; 2025 sparky dev
    </StickyFooter>
  )
}

export default Footer