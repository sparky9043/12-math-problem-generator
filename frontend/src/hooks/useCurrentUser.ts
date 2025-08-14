import type { CurrentUser } from "../App";
import type { Action } from "../contexts/CurrentUser";
import { createContext } from "react";

interface CurrentUserContextValues {
  currentUser: CurrentUser | null,
  dispatch: React.Dispatch<Action>,
}

export const CurrentUserContext = createContext<CurrentUserContextValues | null>(null)