import React, { createContext, useState, type SetStateAction } from "react"
import type { Problem } from "../components/ProblemsList"

interface ProblemsContextType {
  problems: Problem[],
  setProblems: React.Dispatch<SetStateAction<Problem[]>>
}

const ProblemsContext = createContext<ProblemsContextType | undefined>(undefined)

interface ProblemsContextProviderProps {
  children: React.ReactNode
}

const ProblemsContextProvider = (props: ProblemsContextProviderProps) => {
  const [problems, setProblems] = useState<Problem[]>([])

  return (
    <ProblemsContext.Provider value={{problems, setProblems}}>
      {props.children}
    </ProblemsContext.Provider>
  )
}

export default ProblemsContextProvider