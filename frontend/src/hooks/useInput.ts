import { useState } from "react"

const useInput = () => {
  const [value, setValue] = useState<string>('')

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => setValue(event.target.value)

  return [ value, onChange ]
}

export default useInput