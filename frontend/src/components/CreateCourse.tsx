import { useMutation, useQueryClient } from '@tanstack/react-query'
import useCurrentUser from "../hooks/useCurrentUser"
import { setToken } from '../services/courses'
import courseServices from '../services/courses'
import toast from 'react-hot-toast'
import { useState } from 'react'

const CreateCourse = () => {
  const [courseTitle, setCourseTitle] = useState<string>('')
  const [courseCode, setCourseCode] = useState<string>('')
  const { currentUser } = useCurrentUser()
  const client = useQueryClient()
  const createCourseMutation = useMutation({
    mutationFn: courseServices.createCourse,
    mutationKey: ['courses'],
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['courses'] })
    }
  })

  const inputStyles = "border-2 rounded border-emerald-700 hover:border-emerald-500 px-0.5 py-1 focus:outline-emerald-800"

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!courseTitle || !courseCode) {
      toast.error('Please fill out the coures Title and course code!')
      throw new Error('Please fill out the title and course code')
    }
    try {
      if (currentUser?.token) {
        setToken(currentUser.token)
        createCourseMutation.mutate({ title: courseTitle, courseCode })
      }
      setCourseTitle('')
      setCourseCode('')
    } catch (error) {
      if (error instanceof Error) {
        toast(error.message)
      }
    }
  }

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCourseTitle(event.target.value)
  }
  const handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCourseCode(event.target.value)
  }
  
  return (
    <form onSubmit={handleSubmit}>
      Create Course Form
      <div>
        <label>course title</label>
        <input
          className={inputStyles}
          value={courseTitle}
          onChange={handleTitleChange}
        />
      </div>
      <div>
        <label>course code</label>
        <input
          className={inputStyles}
          value={courseCode}
          onChange={handleCodeChange}
        />
      </div>
      <div>
        <button
          className="border-2 p-1"
          type='submit'
          >
          submit
        </button>
      </div>
    </form>
  )
}

export default CreateCourse