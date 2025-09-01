import { useState } from "react"

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
        <button
          className='border-2 px-2 py-1 rounded'
          onClick={handleShowPanel}
        >
          {props.text}
        </button>
      </div>
      <div style={{ display: showPanel ? '' : 'none' }}>
        {props.children}
        <button
          className='border-2 px-2 py-1 rounded'
          onClick={handleShowPanel}
        >cancel</button>
      </div>
    </div>
  )
}

export default Togglable