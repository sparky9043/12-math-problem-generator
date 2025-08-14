import { useReducer } from "react";
import type { CurrentUser } from "../App";
import { CurrentUserContext } from "../hooks/useCurrentUser";

export interface Action {
  type: string,
  payload: CurrentUser
}

interface CurrentUserContextProviderProps {
  children: React.ReactNode,
}

const currentUserReducer = (state: CurrentUser | null, action: Action) => {
  switch (action.type) {
    case "addUser":
      return action.payload
    case "removeUser":
      return null
    default:
      return state
  }
}

const CurrentUserContextProvder = (props: CurrentUserContextProviderProps) => {
  const [currentUser, dispatch] = useReducer(currentUserReducer, null)

  return (
    <CurrentUserContext.Provider value={{ currentUser, dispatch }}>
      {props.children}
    </CurrentUserContext.Provider>
  )
}

export default CurrentUserContextProvder