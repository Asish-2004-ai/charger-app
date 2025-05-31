# ⚡ Charging Station Management App

A full-stack web application for managing electric vehicle charging stations with authentication, CRUD operations, and a Google Maps interface.

---

## 🚀 Tech Stack

### 🔧 Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication

### 💻 Frontend
- React.js
- Material UI (MUI)
- Axios
- React Router DOM
- Google Maps JavaScript API

### ☁️ Deployment
- Backend: Render
- Frontend: Vercel

---

## 📂 Features

### 🧑‍💼 User Authentication
- Register and Login
- JWT token-based protected routes

### 🔌 Charger Management
- Create, Read, Update, Delete chargers
- Filter by status, power output, connector type

### 🗺️ Google Maps View
- Displays all chargers with map markers
- Click marker to view charger details

---

## 📦 Project Structure

/client # React frontend
└── /pages # Signup, Login, ChargerList, MapView
/server # Node.js backend
├── /routes # auth.js, chargers.js
├── /models # User.js, Charger.js
└── /middleware # authMiddleware.js
