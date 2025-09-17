import axios from 'axios'
import type { CreateProblem, Problem } from '../types/types'

const baseUrl = '/api/problems'

let token:string

export const setToken = (inputToken: string) => {
  token = `Bearer ${inputToken}`
}

const getProblems = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createProblem = async (problem: CreateProblem) => {
  const config = {
    headers: {
      authorization: token
    }
  }

  const response = await axios.post(baseUrl, problem, config)
  return response.data
}

const deleteProblem = async (id: string) => {
  const config = {
    headers: {
      authorization: token
    }
  }

  await axios.delete(`${baseUrl}/${id}`, config)
}

const editProblem = async (problemObject: Problem) => {
  const config = {
    headers: {
      authorization: token
    }
  }

  const updatedProblem = await axios.put(`${baseUrl}/${problemObject.id}`, problemObject, config)

  return updatedProblem
}

export default { getProblems, createProblem, deleteProblem, editProblem }