import { useState } from "react"

const useInput = (initialString = '', type = 'text') => {
  const [value, setValue] = useState<string>(initialString)

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => setValue(event.target.value)

  return { value, onChange, type }
}

export default useInput