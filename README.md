# 🚀 Progress Tracker

A full-stack skill tracking web application built with **Node.js, Express, PostgreSQL, and Vanilla JavaScript**.

This project demonstrates REST API design, MVC architecture, database integration, and cloud deployment.

🌍 Live Demo:  
👉 https://first-project-nodejs-j6gw.onrender.com

---

## 🛠 Tech Stack

### Backend
- Node.js
- Express
- PostgreSQL
- pg (node-postgres)

### Frontend
- HTML5
- CSS3
- Vanilla JavaScript (Fetch API)

### Deployment
- Render (Web Service + PostgreSQL)

---

## ✨ Features

- Add new skills
- Update skill progress (+10% or mark as done)
- Delete skills
- Filter by category
- Search by title
- Progress bar visualization
- Live statistics (Total / Active / Done)

---

## 📂 Project Structure

```
src/
  app.js
  server.js
  db.js
  routes/
  controllers/
  data/

public/
  index.html
  app.js
  style.css
```

---

## ⚙️ Local Installation

### 1️⃣ Clone repository

```bash
git clone https://github.com/SiamakSm/progress-tracker.git
cd progress-tracker
```

### 2️⃣ Install dependencies

```bash
npm install
```

---

## 🗄 Database Setup (Local)

Make sure PostgreSQL is installed and running.

Create the database:

```sql
CREATE DATABASE progress_tracker;
```

Connect to it:

```sql
\c progress_tracker
```

Create the table:

```sql
CREATE TABLE skills (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  progress INTEGER DEFAULT 0,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```
PORT=4000
NODE_ENV=development
DATABASE_URL=postgresql://your_user@localhost:5432/progress_tracker
```

Example (Mac default user):

```
DATABASE_URL=postgresql://sia@localhost:5432/progress_tracker
```

---

## ▶️ Run the Project

```bash
npm run dev
```

Then open in your browser:

```
http://localhost:4000
```

---

## 🌍 Deployment (Render)

The production version is deployed using:

- Render Web Service
- Render PostgreSQL Database

In production:

```
NODE_ENV=production
DATABASE_URL=<Render Internal Database URL>
```

SSL is automatically enabled in production inside `db.js`.

---

## 🏗 Architecture

The project follows an MVC structure:

- Routes → Handle endpoints
- Controllers → Business logic
- Data Layer → Database queries
- Public → Frontend interface

Frontend communicates with backend via Fetch API.

---

## 🎯 Learning Objectives

- RESTful API design
- Middleware validation
- PostgreSQL integration
- Environment configuration
- Production vs Development setup
- Cloud deployment workflow
- Frontend ↔ Backend interaction

---

## 👨‍💻 Author

Siamak