# Math Assignment Platform

A full-stack web application that lets math teachers build courses, author multiple-choice problems, group them into assignments, and distribute them to students via join codes. Students complete assignments in the browser and receive automatic grading based on their answers.

**Repository:** [https://github.com/sparky9043/12-math-problem-generator](https://github.com/sparky9043/12-math-problem-generator)

---

## Overview

The platform serves two distinct user roles — **teachers** and **students** — each with a separate interface and permission set determined at login.

Teachers create courses, each of which generates a unique course code. They author a bank of math problems scoped to a course (subject, branch, topic, question, multiple-choice options, and the correct answer), then assemble selected problems into named assignments. Students register an account, join a teacher's course using its code, view the assignments for that course, and submit answers. When a student submits, the system compares each answer against the stored correct answer and records which problems they got right, preventing resubmission of an already-completed assignment.

---

## Tech Stack

### Backend
| Technology | Purpose |
|---|---|
| Node.js | Runtime |
| Express 5 | Web framework and routing |
| MongoDB | Database |
| Mongoose 8 | ODM and schema modeling |
| JSON Web Tokens (jsonwebtoken) | Stateless authentication |
| bcrypt | Password hashing |
| dotenv | Environment variable management |
| morgan | HTTP request logging |
| cross-env | Cross-platform environment variable setting in npm scripts |

### Frontend
| Technology | Purpose |
|---|---|
| React 19 | UI library |
| TypeScript | Type safety throughout |
| Vite 7 | Build tool and dev server |
| React Router 7 | Client-side routing with role-based routes |
| TanStack Query 5 | Server state management, caching, and mutations |
| Axios | HTTP client |
| Tailwind CSS 4 | Styling |
| react-hot-toast | Toast notifications |

---

## Architecture

### Backend — layered structure

The backend follows a clean three-layer separation:

```
controllers/   → HTTP routing, request/response handling
services/      → business logic, database operations
models/        → Mongoose schemas
utils/         → middleware, error classes, config, logging
```

Controllers are kept thin — they extract request data, call the relevant service, and shape the response. All business logic and database access lives in the service layer. This separation makes the logic testable independently of the HTTP layer and keeps each route handler readable.

### Frontend — feature-organized React

```
components/    → UI components (role-aware)
contexts/      → CurrentUser and Problems context providers
hooks/         → custom hooks (useCurrentUser, useInput, useProblems, useNotification)
services/      → API client modules (one per resource)
types/         → shared TypeScript interfaces
utils/         → helper functions
```

Routing is role-aware: the same URL path renders a different component depending on whether the logged-in user is a teacher or a student. For example, `/dashboard/courses` renders the teacher's course-management list for teachers and the join-and-view course list for students.

---

## Data Model

### User
Represents both teachers and students, differentiated by the `userType` field.
- `username` (unique, min 3 chars), `name`, `passwordHash`
- `userType` — `'teacher'` or `'student'`
- `courses` — references to associated courses
- Password hash is stripped from all JSON responses via a schema transform.

### Course
- `title`, `courseCode` (unique — used by students to join)
- `createdAt`
- `user` — reference to the owning teacher
- `problems` — references to the course's problem bank
- `students` — references to enrolled students

### Problem
A single multiple-choice math question.
- `subject`, `branch`, `topic` — categorization
- `question` (unique), `choices` (array of options), `answer` (the correct one)
- `user` — author (teacher), `course` — owning course

### Assignment
A named bundle of problems distributed to students.
- `assignmentTitle`, `course`, `teacher`
- `problems` — references to included problems
- `assignedAt` — timestamp
- `studentsCompleted` — array of records, each holding a `studentId` and the list of `correctProblems` that student answered correctly

### Relationships
- A teacher owns many courses; a course belongs to one teacher.
- A course contains many problems and many enrolled students.
- An assignment belongs to one course and bundles many problems.
- The `studentsCompleted` sub-document records per-student completion and scoring inside each assignment.

---

## Authentication & Authorization

Authentication is **JWT-based**. On login, the server validates credentials with bcrypt, signs a token containing the username and user ID with a one-hour expiry, and returns it alongside the user's profile and role. The frontend persists this in `localStorage` and attaches it as a `Bearer` token on authenticated requests.

Authorization is enforced through Express middleware:
- **`tokenExtractor`** pulls the bearer token from the `Authorization` header on every request.
- **`userExtractor`** verifies the token, loads the user, and attaches the user ID to the request for protected routes (course creation/deletion, assignment creation, joining courses).

Role checks happen in the service layer — for example, assignment creation explicitly throws a `ForbiddenError` if the requesting user is not a teacher. Ownership checks prevent users from deleting accounts or resources they don't own.

---

## API Reference

All endpoints are prefixed with `/api`. Routes marked 🔒 require a valid bearer token.

### Authentication
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/login` | Authenticate and receive a JWT + user profile |

### Users
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/users` | List all users (with populated course titles) |
| GET | `/api/users/:id` | Get a single user |
| POST | `/api/users` | Register a new user (teacher or student) |
| DELETE | `/api/users/:id` 🔒 | Delete own account (cascades to owned courses and their problems) |

### Problems
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/problems` | List all problems |
| GET | `/api/problems/:id` | Get a single problem |
| POST | `/api/problems` 🔒 | Create a problem |
| PUT | `/api/problems/:id` | Update a problem |
| DELETE | `/api/problems/:id` | Delete a problem |

### Courses
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/courses` | List all courses |
| GET | `/api/courses/:id` | Get a single course |
| POST | `/api/courses` 🔒 | Create a course |
| PUT | `/api/courses/:id` 🔒 | Update a course (title, code, or add a student) |
| PUT | `/api/courses/join-by-code` 🔒 | Student joins a course using its code |
| DELETE | `/api/courses/:id` 🔒 | Delete an owned course |

### Assignments
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/assignments` | List all assignments (with populated problems) |
| GET | `/api/assignments/:id` | Get a single assignment |
| POST | `/api/assignments` 🔒 | Create an assignment (teachers only) |
| PUT | `/api/assignments/:id` 🔒 | Submit student completion + correct problems |

### Health
| Method | Endpoint | Description |
|---|---|---|
| GET | `/health` | Health check, returns 200 |

---

## Key Features

### For Teachers
- Create and manage courses, each with an auto-generated unique join code
- Author a categorized bank of multiple-choice math problems per course
- Bundle selected problems into named assignments
- View which students have completed each assignment and how many problems they answered correctly

### For Students
- Register an account and join courses using a teacher's course code
- View all assignments for joined courses
- Complete assignments in-browser with multiple-choice selection
- Receive automatic grading — the system scores answers against stored correct answers on submission
- Protected against duplicate submission of completed assignments

### System-wide
- Role-based interfaces from a single shared route tree
- JWT authentication with token expiry
- Server state caching and automatic invalidation via TanStack Query
- Toast notifications for user feedback
- Cascading deletes (removing an account cleans up its owned courses and their problems)

---

## Automatic Grading Logic

When a student submits an assignment, the frontend iterates over each problem in the assignment and compares the student's selected choice against the problem's stored `answer`. The IDs of correctly answered problems are collected and sent to the backend, which appends a completion record (`studentId` + `correctProblems`) to the assignment's `studentsCompleted` array. The service layer guards against resubmission by checking whether the student already appears in that array and throwing a `ForbiddenError` if so.

---

## Custom Error Handling

The backend defines custom error classes (`ValidationError`, `NotFoundError`, `ForbiddenError`) thrown from the service layer and translated to appropriate HTTP status codes by a centralized `errorHandler` middleware. The handler also normalizes common Mongoose errors — duplicate key violations, validation failures, malformed IDs, and JWT errors (invalid/expired tokens) — into clean JSON error responses.

---

## Local Development

### Prerequisites
- Node.js
- A MongoDB connection string

### Backend setup
```bash
cd backend
npm install
```

Create a `.env` file:
```env
MONGODB_URI=your-mongodb-connection-string
SECRET_KEY=your-jwt-signing-secret
PORT=3001
```

Run the server:
```bash
npm run dev      # development with --watch
npm start        # production mode
npm test         # run the test suite
```

### Frontend setup
```bash
cd frontend
npm install
npm run dev      # Vite dev server
npm run build    # type-check and build for production
npm run preview  # preview the production build
```

The production frontend build is served as static files from the backend's `dist` directory.

---

## Notes & Observations

A few things worth highlighting from a code-review perspective:

- The **service/controller separation** is clean and consistent — a strong architectural choice that keeps route handlers thin and logic testable.
- The **custom error class hierarchy** combined with centralized error translation is more disciplined than typical projects of this scope.
- **TanStack Query** is used well for server state, with mutation-triggered cache invalidation keeping the UI in sync.
- The data model uses a **single `User` model with a `userType` discriminator** rather than separate teacher/student collections, which keeps authentication uniform while still enabling role-based behavior.
- A few areas a future iteration could tighten: some PUT/DELETE problem routes are not behind the `userExtractor` middleware that protects other write routes; grading happens client-side before being recorded server-side (a determined user could submit arbitrary "correct" IDs), so moving scoring fully server-side would harden integrity; and the cascading delete logic could be wrapped in a transaction for atomicity.

These are refinements, not flaws — the application is a coherent, working, role-aware full-stack system with thoughtful separation of concerns.
