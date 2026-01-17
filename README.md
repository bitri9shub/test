# 🚀 MERN Stack Showcase Application

This repository is a comprehensive full-stack project designed to demonstrate how to build and structure a modern **MERN** (MongoDB, Express, React, Node.js) application. It features a decoupled architecture, clear separation of concerns, and a professional folder structure.



[Image of MERN stack architecture diagram]


---

## 🛠️ Tech Stack

* **Frontend:** React.js (via Vite)
* **Backend:** Node.js & Express.js
* **Database:** MongoDB
* **Testing:** Jest
* **Code Quality:** ESLint

---

## 📂 Project Structure

The project is split into two main environments to ensure a clean development workflow:

### 1. Backend (`/api`)
The server-side logic follows a structured pattern for scalability:
* **Models:** Data schemas for Users, Courses, Chapters, Sections, and Subsections.
* **Controllers:** Business logic for processing requests.
* **Routers:** API endpoint definitions.
* **Middlewares:** Custom logic for request filtering and security.
* **Utils:** Helper functions used across the API.
* **__tests__:** Unit and integration tests using Jest.

### 2. Frontend (`/client`)
A high-performance React application built with:
* **Vite:** For near-instant hot module replacement (HMR) and optimized builds.
* **ESLint:** To maintain consistent code standards and catch errors early.