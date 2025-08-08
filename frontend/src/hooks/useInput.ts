import { useState } from "react"

const useInput = (type = 'text') => {
  const [value, setValue] = useState<string>('')

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => setValue(event.target.value)

  return { value, onChange, type }
}

export default useInput