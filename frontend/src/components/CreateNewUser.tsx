import { useState } from 'react'

const CreateNewUser = () => {
  const [name, setName] = useState<string>('')
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPwd, setConfirmPwd] = useState<string>('')

  const inputStyles = 'border-2 border-emerald-800 rounded'

  return (
    <form className='p-2 flex flex-col gap-2 items-center h-full font text-lg'>
      <h2>Account Forms</h2>
      <div>
        <label>
          name
        </label>
        <input
          value={name}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value)}
          className={inputStyles}
          type='text'
        />
      </div>
      <div>
        <label>
          username
        </label>
        <input 
          className={inputStyles}
          value={username}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => setUsername(event.target.value)}
          type='text'
        />
      </div>
      <div>
        <label>
          password
        </label>
        <input
          className={inputStyles}
          value={password}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
          type='password'
        />
      </div>
      <div>
        <label>
          confirm
        </label>
        <input
          className={inputStyles}
          value={confirmPwd}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => setConfirmPwd(event.target.value)}
          type='password'
        />
      </div>
      <div className='text-center'>
        <button
          className='border-2 px-2 py-1 rounded'
        >
          create account
        </button>
      </div>
    </form>
  )
}

export default CreateNewUser