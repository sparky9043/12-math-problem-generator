import { createContext, useReducer } from "react";
import type { CurrentUser } from "../App";

interface CurrentUserContextValues {
  currentUser: CurrentUser | null,
  dispatch: React.Dispatch<Action>,
}

const CurrentUserContext = createContext<CurrentUserContextValues | null>(null)

interface CurrentUserContextProviderProps {
  children: React.ReactNode,
}

interface Action {
  type: string,
  payload: CurrentUser
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