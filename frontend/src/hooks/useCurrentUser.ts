import type { CurrentUser } from "../App";
import type { Action } from "../contexts/CurrentUser";
import { createContext, useContext } from "react";

interface CurrentUserContextValues {
  currentUser: CurrentUser | null,
  dispatch: React.Dispatch<Action>,
}

export const CurrentUserContext = createContext<CurrentUserContextValues | null>(null)

const useCurrentUser = () => {
  const context = useContext(CurrentUserContext)

  if (!context) {
    throw new Error('useContext must be used inside Current User Context Provider')
  }

  return context
}

export default useCurrentUser