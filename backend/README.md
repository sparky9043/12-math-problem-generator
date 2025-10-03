# 📚 Teacher App

A full-stack application that enables teachers to create courses, assignments, and problems for students. Students can join courses, complete assignments, and submit answers dynamically. Built with React (TypeScript) on the frontend, Node.js + Express on the backend, and MongoDB for data persistence.

---

## 🌟 Highlights

- 👩‍🏫 Teacher dashboard for managing courses, assignments, and problems  
- 🧑‍🎓 Students can join courses and complete assignments  
- ✍️ Dynamic quiz forms with multiple choice answers  
- 🔐 Authentication with JWT-based login and protected routes  
- 🗄️ MongoDB + Mongoose models for users, courses, assignments, and problems  
- ⚡ Full separation of concerns with controllers, services, and middleware  
- 🚀 Ready for deployment as a minimal MVP

---

## ℹ️ Overview

This project is my first completed full-stack MVP, created to practice real-world backend and frontend integration.  

- **Backend:** Built with Express, using a layered architecture (controllers → services → models). Includes custom error classes and centralized error handling.  
- **Frontend:** Built with React + TypeScript, using React Router v7 for navigation and React Query v5 for server state management. Includes forms for creating and completing assignments.  
- **Database:** MongoDB with Mongoose schemas for Users, Courses, Assignments, and Problems.  

Unlike a simple CRUD app, this project demonstrates **role-based features** (teachers vs students), **assignment building** (problems tied to courses), and **dynamic form rendering** (students complete assignments generated from stored problems).

---

## 🚀 Usage Instructions

### Teacher Flow
1. Register / log in as a teacher.  
2. Create a course.  
3. Add problems (questions with multiple choice answers).  
4. Build assignments by combining problems.  

### Student Flow
1. Register / log in as a student.  
2. Join a course with a join code.  
3. View assignments available in the course.  
4. Complete assignments by selecting answers from dynamically generated forms.  

---

## ⬇️ Installation Instructions

Clone both repos (frontend and backend).  

### Backend setup
1. Navigate to backend folder  
2. Run `npm install`  
3. Set up `.env` with MongoDB URI and JWT secret  
4. Run `npm run dev`  

### Frontend setup
1. Navigate to frontend folder  
2. Run `npm install`  
3. Set up `.env` with API base URL  
4. Run `npm run dev`  

---

## ✍️ Author

This project was created as my first full-stack MVP. It reflects my learning journey through JavaScript, React, Node.js, Express, and MongoDB. It demonstrates my ability to deliver an end-to-end product with real-world patterns and features.  

---

## 💭 Contributing

This project is still in its early stages. Feedback, suggestions, or contributions are welcome. Please open an issue or a discussion to share your thoughts.  
