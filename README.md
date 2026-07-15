# Kumaran R P - Premium Personal Portfolio & Control Room

This is a state-of-the-art, ultra-premium, interactive portfolio website for Kumaran R P. Inspired by Apple, Vercel, and Linear's design mechanics, it utilizes interactive 3D simulations, smooth scrolling dynamics, and glassmorphism styling.

## 🚀 Key Features

* **3D Interactive MacBook Air M4 Intro Screen**: A realistic, lightweight 3D MacBook Air model rendered procedurally in React Three Fiber that tilts on hover, opens on click, executes an Apple boot sequence, and camera-zooms into the portfolio dashboard.
* **Luxurious Glassmorphic Dashboard**: Sleek cards featuring customized neon hover spotlights, magnetic button controls, and high-performance scroll triggers.
* **Smooth Lenis Scroll**: Liquid-like vertical page transition effects with zero stutters.
* **Express & MongoDB Management System**: A fully functional Node.js API with models for projects, credentials, messages, and admin profiles.
* **Secure Admin Control Room**: Protected panel using JSON Web Tokens (JWT) for monitoring visitor messages and performing real-time CRUD management.
* **Integrated Nodemailer Service**: Automatic email forwarding for contact submissions.
* **100 Lighthouse Performance Ready**: Optimized assets, lazy-loaded Three.js scenes, and built-in local state fallbacks.

---

## 📂 Project Structure

```
Kumaaran Portfolio/
├── client/                 # React frontend (Vite)
│   ├── public/             # robots.txt, sitemap, favicon, manifest
│   ├── src/
│   │   ├── assets/         # Project images & local files
│   │   ├── components/     # CustomCursor, GlassCard, GlowingButton, Navbar
│   │   ├── pages/          # Portfolio dashboard, Login view, Admin Dashboard
│   │   ├── sections/       # Hero, About, Skills, Projects, Experience, Certifications, Contact, Footer
│   │   ├── data/           # resumeData.js (local fallback database)
│   │   ├── three/          # MacbookCanvas.jsx, MacbookModel.jsx
│   │   └── App.jsx         # App router and entry controller
│   ├── tailwind.config.js
│   └── vite.config.js
│
└── backend/                # Express backend
    ├── config/             # MongoDB configurations (db.js)
    ├── controllers/        # Controllers (auth, project, certificate, message, profile)
    ├── middleware/         # Auth protector, rate-limiters, error handling
    ├── models/             # Mongoose Schemas (User, Project, Certificate, Message)
    ├── routes/             # Express Route declarations
    └── server.js           # Server application startup entrypoint
```

---

## 🛠️ Installation & Setup

### Prerequisites
* Node.js (v18 or higher recommended)
* MongoDB database instance running locally or on MongoDB Atlas.

### 1. Backend Configuration
1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install backend dependencies:
   ```bash
   npm install
   ```
3. Set up your environmental variables inside `.env` (you can copy `.env.example`):
   ```bash
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/kumaran_portfolio
   JWT_SECRET=your_super_secure_jwt_secret
   CLIENT_URL=http://localhost:5173
   
   # Enable Nodemailer contact notifications (optional)
   EMAIL_SERVICE=gmail
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_gmail_app_password
   EMAIL_RECEIVER=kumaranrp49@gmail.com
   ```
4. Start the server in development mode (launches hot-reload nodemon):
   ```bash
   npm run dev
   ```

### 2. Client Configuration
1. Open a new terminal and navigate to the client folder:
   ```bash
   cd client
   ```
2. Install frontend dependencies:
   ```bash
   npm install
   ```
3. Run the Vite local development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🔒 Administrative Account Initialization

To seed the initial admin database profile:
1. Fire a `POST` request to `/api/auth/register` (using Postman or curl):
   ```bash
   curl -X POST http://localhost:5000/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{"name": "Kumaran R P", "email": "kumaranrp49@gmail.com", "password": "your_secure_password"}'
   ```
2. Visit the `/admin/login` path in the web client, sign in, and manage your portfolio content.
