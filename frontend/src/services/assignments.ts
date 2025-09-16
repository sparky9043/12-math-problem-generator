import axios from 'axios'
import type { Assignment } from '../types/types'

interface ProblemsObject {
  problems: string[]
  courseId: string,
  assignmentTitle: string,
}

interface UpdateObject {
  assignmentId: string,
  studentId: string,
  correctProblems: string[],
}

const baseUrl = '/api/assignments'

let token:string

export const setToken = (inputToken: string) => {
  token = `Bearer ${inputToken}`
}

const getAssignments = async () => {
  const response = await axios.get(baseUrl)

  return response.data
}

const getAssignmentsByCourseId = async (courseId: string) => {
  const response = await axios.get(baseUrl)

  const assignments:Assignment[] = response.data

  const courseById = assignments.filter(assignment => assignment.course === courseId)

  return courseById
}

const createAssignment = async (problemsObject: ProblemsObject) => {
  const config = {
    headers: {
      authorization: token
    }
  }

  const response = await axios.post(baseUrl, problemsObject, config)

  return response.data
}

const updateAssignment = async(updateObject: UpdateObject) => {
  const config = {
    headers: {
      authorization: token
    }
  }

  const { assignmentId, studentId, correctProblems } = updateObject

  const response = await axios.put(`${baseUrl}/${assignmentId}`, { studentId, correctProblems }, config)

  return response.data
}

export default { getAssignments, createAssignment, getAssignmentsByCourseId, updateAssignment }