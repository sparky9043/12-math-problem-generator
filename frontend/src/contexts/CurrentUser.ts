import { createContext } from "react";

const CurrentUserContext = createContext(null)

import type { CurrentUser } from "../App";

interface ActionProp {
  type: string,
  payload: CurrentUser,
}

export const currentUserReducer = (state: CurrentUser | null, action: ActionProp) => {
  switch (action.type) {
    case "updateCurrentUser":
      return action.payload
    default:
      return state
  }
}

export default CurrentUserContext