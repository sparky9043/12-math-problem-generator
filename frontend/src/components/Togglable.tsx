import { useState } from "react"

interface TogglableProps {
  children: React.ReactNode,
}

const Togglable = (props: TogglableProps) => {
  const [showPanel, setShowPanel] = useState<boolean>(false)

  const handleShowPanel = () => {
    setShowPanel(!showPanel)
  }

  return (
    <div>
      <div style={{ display: showPanel ? 'none' : '' }}>
        Click to create problems
        <button onClick={handleShowPanel}>click</button>
      </div>
      <div style={{ display: showPanel ? '' : 'none' }}>
        {props.children}
        <button onClick={handleShowPanel}>cancel</button>
      </div>
    </div>
  )
}

export default Togglable