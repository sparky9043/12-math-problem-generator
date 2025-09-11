import React, { useState } from "react"
import type { Problem } from '../types/types'
import { ProblemsContext } from "../hooks/useProblems"

interface ProblemsContextProviderProps {
  children: React.ReactNode
}

const ProblemsContextProvider = (props: ProblemsContextProviderProps) => {
  const [problems, setProblems] = useState<Problem[]>([])

  return (
    <ProblemsContext.Provider value={{ problems, setProblems }}>
      {props.children}
    </ProblemsContext.Provider>
  )
}

export default ProblemsContextProvider