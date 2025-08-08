import { useCallback, useState } from "react"

interface NotificationProps {
  type: string,
  message: string,
}

const useNotification = () => {
  const [notification, setNotification] = useState<NotificationProps | null>(null)

  const handleNotification = useCallback((input: NotificationProps | null, timeInSeconds: number) => {
    setNotification(input)
    setTimeout(() => {
      setNotification(null)
    }, timeInSeconds * 1000)
  }, [])

  return { notification, handleNotification }
}

export default useNotification