import { useState } from "react"
import Button from "./Button"

interface TogglableProps {
  children: React.ReactNode,
  text: string,
}

const Togglable = (props: TogglableProps) => {
  const [showPanel, setShowPanel] = useState<boolean>(false)

  const handleShowPanel = () => {
    setShowPanel(!showPanel)
  }

  return (
    <div>
      <div style={{ display: showPanel ? 'none' : '' }}>
        <Button
          variant="secondary"
          onClick={handleShowPanel}
        >
          {props.text}
        </Button>
      </div>
      <div style={{ display: showPanel ? '' : 'none' }}>
        {props.children}
        <Button
          variant="secondary"
          onClick={handleShowPanel}
        >cancel</Button>
      </div>
    </div>
  )
}

export default Togglable