import { useState } from 'react'
import toast from 'react-hot-toast'

// type UserType = 'teacher' | 'student'

const CreateNewUser = () => {
  const [name, setName] = useState<string>('')
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPwd, setConfirmPwd] = useState<string>('')
  const [userType, setUserType] = useState<string>('teacher')

  const inputStyles = 'border-2 border-emerald-800 rounded px-1 py-0.5'

  const handleCreateUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      if (!name || !username || !password || !confirmPwd) {
        throw new Error('Make sure all the fields are filled out!')
      } else if (password !== confirmPwd) {
        throw new Error('Make sure the passwords match!')
      }

      
    } catch (exception: unknown) {
      if (exception instanceof Error) {
        toast.error(exception.message)
      }
    }
  }

  return (
    <form
      className='p-2 flex flex-col gap-2 items-center h-full font text-lg'
      onSubmit={handleCreateUser}
    >
      <h2>Account Forms</h2>
      <div>
        <label htmlFor='userType'>
          Select User Type
        </label>
        <select
          id='userType'
          className='
            block
            w-48
            rounded-md
            border border-emerald-700
            py-2 px-3
            text-sm
            text-emerald-900
            shadow-sm
            focus:outline-none
            focus:ring-2 focus:ring-emerald-500
            focus:border-emerald-500
            cursor-pointer
          '
          value={userType}
          onChange={(event: React.ChangeEvent<HTMLSelectElement>) => setUserType(event.target.value)}
        >
          <option
            value="teacher"
          >
            teacher
          </option>
          <option
            value="student"
          >
            student
          </option>
        </select>
      </div>
      <div>
        <label htmlFor='name'>
          name
        </label>
        <input
          id='name'
          value={name}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value)}
          className={inputStyles}
          type='text'
        />
      </div>
      <div>
        <label htmlFor='username'>
          username
        </label>
        <input 
          id='username'
          className={inputStyles}
          value={username}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => setUsername(event.target.value)}
          type='text'
        />
      </div>
      <div>
        <label htmlFor='password'>
          password
        </label>
        <input
          id='password'
          className={inputStyles}
          value={password}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
          type='password'
        />
      </div>
      <div>
        <label htmlFor='confirmPassword'>
          confirm
        </label>
        <input
          id='confirmPassword'
          className={inputStyles}
          value={confirmPwd}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => setConfirmPwd(event.target.value)}
          type='password'
        />
      </div>
      
      <div className='text-center'>
        <button
          className='border-2 px-2 py-1 rounded'
          type='submit'
        >
          create account
        </button>
      </div>
    </form>
  )
}

export default CreateNewUser