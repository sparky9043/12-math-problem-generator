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
  courseCode: string,
  id: string,
}

export interface Assignment {
  assignedAt: string,
  assignmentTitle: string,
  course: string,
  id: string,
  problems: Problem[],
  teacher: string,
  studentsCompleted: StudentsCompleted[],
}

export interface StudentsCompleted {
  correctProblems: string[],
  studentId: string,
  _id: string,
}