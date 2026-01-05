# AI Interview Copilot

AI Interview Copilot is a full‑stack web application that helps users prepare for interviews by generating personalized technical and HR questions based on their resume and job description.

---

## 🚀 Features

- User authentication (JWT based)
- Upload resume (PDF / DOC / DOCX)
- Enter job description
- AI‑generated interview questions
- Session‑based interview tracking
- Separate Technical & HR questions
- View previous interview sessions
- Secure backend APIs

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- React Router
- Axios
- CSS (separate files)

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Multer (file upload)
- PDF parsing

---

## 🧩 Application Flow

1. User registers / logs in
2. Home page shows navigation options
3. User clicks **Prepare Interview**
4. Uploads resume + enters job description
5. Backend creates a session and triggers AI
6. User views session status in **Sessions**
7. Clicks completed session to view questions & answers

---

## 📂 Project Structure

frontend/
├─ src/
│ ├─ components/
│ ├─ pages/
│ ├─ services/
│ └─ App.jsx

backend/
├─ routes/
├─ models/
├─ middleware/
└─ server.js


---

## 🔐 Authentication

- JWT tokens are used for authentication
- User ID is extracted from token on backend
- Frontend never sends userId explicitly

---

## ▶️ How to Run Locally

### Backend
```bash
cd backend
npm install
npm run dev

📌 Future Improvements
Session status auto‑refresh

Better UI/UX styling

Protected routes

Download questions as PDF

Answer evaluation & feedback

👨‍💻 Author
Janapati Naveen
Final Year Student | Full‑Stack Developer