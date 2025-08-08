import { useState } from "react"

interface useNotificationProps {
  type: string,
  message: string,
}

const useNotification = (input: useNotificationProps | null) => {
  const [notification, setNotification] = useState(input)

  return { notification, setNotification }
}

export default useNotification