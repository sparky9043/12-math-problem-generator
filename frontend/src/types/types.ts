export interface Problem {
  subject: string,
  branch: string,
  topic: string,
  question: string,
  choices: string[],
  answer: string,
  user: User,
  course: Course,
  id: string,
}

export interface User {
  id: string,
  username: string,
}

export interface Course {
  title: string,
  id: string,
}