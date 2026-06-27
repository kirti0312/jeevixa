# 🏥 Jeevixa – AI-Powered Smart Hospital Management System

## Overview

Jeevixa is an AI-powered Smart Hospital Management System designed to improve hospital operations through intelligent automation and real-time analytics. It combines hospital management with artificial intelligence to optimize patient care, reduce operational inefficiencies, monitor sustainability, and assist healthcare professionals in making faster and smarter decisions.

The platform provides a centralized dashboard for managing patients, hospital beds, staff, medicines, infection risks, and environmental impact while integrating an AI assistant powered by Google Gemini.

---

## Problem Statement

Many hospitals still rely on manual processes and disconnected systems, making it difficult to efficiently manage hospital operations.

Some common challenges include:

- Inefficient bed allocation
- Hospital-acquired infections
- Medicine wastage due to expired inventory
- Poor staff scheduling
- Lack of sustainability monitoring
- Slow operational decision-making

Jeevixa addresses these challenges by bringing all hospital operations into a single intelligent platform.

---

# Features

### 🛏 Intelligent Bed Allocation
- Automatically assigns the most suitable hospital bed.
- Considers patient condition, ward type, infection risk, and bed availability.
- Updates bed status in real time.

### 👨‍⚕️ Patient Management
- Register new patients.
- View patient information.
- Assign beds.
- Discharge patients with automatic bed release.

### 🦠 Infection Risk Monitoring
- Calculates ward-wise infection risk.
- Displays real-time infection scores.
- Generates alerts for high-risk wards.

### 🌱 Green Hospital Analytics
- Tracks hospital sustainability.
- Monitors:
  - Energy usage
  - Water consumption
  - Carbon footprint
  - Medicine waste
- Calculates an overall Green Score.

### 📈 Patient Surge Prediction
- Predicts upcoming patient admissions.
- Helps hospitals prepare staff and resources.
- Displays admission trends.

### 💊 Medicine Inventory Management
- Tracks medicine stock.
- Detects expired medicines.
- Monitors inventory efficiently.

### 👩‍⚕️ Staff Management
- Manage hospital staff.
- Track work shifts.
- Detect staff fatigue.
- Role-based management.

### 🔔 Smart Alert System
Automatically generates alerts for:
- High ward occupancy
- Infection outbreaks
- Medicine expiry
- Staff fatigue

### 🤖 AI Hospital Assistant
Powered by Google Gemini AI.

The chatbot helps users by:
- Answering hospital-related queries
- Explaining hospital statistics
- Providing operational insights
- Supporting both English and Hindi

### 🔐 Secure Authentication
- JWT Authentication
- Password encryption using bcrypt
- Role-based access for Admin, Doctor, and Nurse

---

# Tech Stack

## Frontend
- React.js
- React Router
- Axios
- Recharts
- Framer Motion

## Backend
- Node.js
- Express.js
- JWT Authentication
- bcrypt
- Mongoose

## Database
- MongoDB Atlas

## AI
- Google Gemini 1.5 Flash API

## Deployment
- Vercel
- Render

---

# System Architecture

```
                 React Frontend
                        │
                        ▼
                REST API (Axios)
                        │
                        ▼
             Node.js + Express Server
                        │
                        ▼
                MongoDB Atlas Database
                        │
                        ▼
              Google Gemini AI API
```

---

# Project Structure

```
jeevixa/
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── seed.js
│   └── server.js
│
└── frontend/
    └── src/
        ├── components/
        ├── App.js
        └── index.css
```

---

# Installation

## Clone the repository

```bash
git clone <repository-url>
cd jeevixa
```

## Install Backend

```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder.

```env
MONGODB_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
GEMINI_API_KEY=your_api_key
PORT=5000
```

Run the backend.

```bash
node seed.js
node server.js
```

## Install Frontend

```bash
cd ../frontend
npm install
npm start
```

The application will run on:

```
http://localhost:3000
```

---

# Future Enhancements

- Machine Learning based patient surge prediction
- Infection outbreak prediction
- IoT integration for smart hospital monitoring
- Mobile application
- Multi-hospital management
- Advanced analytics dashboard
- Cloud-native scalability

---

# Author

**Kirti Tiwari**

B.Tech Computer Science Student

AI • Full Stack Development • Data Structures & Algorithms

---

## License

This project is licensed under the MIT License.

---

## ⭐ If you like this project, consider giving it a star.
