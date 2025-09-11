import React, { createContext, useContext, type SetStateAction } from "react"
import type { Problem } from '../types/types'

interface ProblemsContextType {
  problems: Problem[],
  setProblems: React.Dispatch<SetStateAction<Problem[]>>
}

export const ProblemsContext = createContext<ProblemsContextType | undefined>(undefined)

const useProblems = () => {
  const context = useContext(ProblemsContext)

  if (!context) {
    throw new Error('useProblems must be used within a ProblemsProvider')
  }

  return context
}

export default useProblems