# IdeaSpark (IdeaHub)

Welcome to IdeaSpark! This is a full-stack platform built to connect visionaries with developers to turn concepts into code.

The project is split into two parts:
1. **Frontend**: A Next.js (React) application with Tailwind CSS.
2. **Backend**: A NestJS API connected to a Supabase (PostgreSQL) database via Prisma.

---

## Prerequisites

Before running the application, make sure you have the following installed on your computer:
- [Node.js](https://nodejs.org/) (Version 18 or higher is recommended)
- A stable Wi-Fi connection that allows standard database connections (ports `5432` and `6543`).

---

## How to Run the Application

You will need to run both the backend server and the frontend server at the same time in two separate terminal windows.

### 1. Start the Backend (Terminal 1)

The backend handles all the database logic, authentication, and live data.

1. Open a terminal and navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install the necessary dependencies:
   ```bash
   npm install
   ```
3. Generate the database client (just to be safe!):
   ```bash
   npx prisma generate
   ```
4. Start the server:
   ```bash
   npm run start:dev
   ```
*If successful, you will see a message saying "Nest application successfully started". The backend is now running on `http://localhost:4000`.*

> **⚠️ Important Database Note:** The backend requires a `.env` file containing the Supabase `DATABASE_URL` and `DIRECT_URL` to work. Ensure this file is present inside your `backend` folder!

### 2. Start the Frontend (Terminal 2)

The frontend is the visual UI that you interact with in the browser.

1. Open a **new** terminal and navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install the frontend dependencies:
   ```bash
   npm install
   ```
3. Start the Next.js development server:
   ```bash
   npm run dev
   ```

### 3. Test it out!

Once both servers are running, open your web browser and go to:
👉 **`http://localhost:3000`**

You should see the IdeaSpark landing page! Try clicking "Get Started" to create a new account, which will automatically save to the live Supabase database.

---

## Troubleshooting
- **"500 Internal Server Error" or "Can't reach database server":** This means your current Wi-Fi network (like a strict corporate network or mobile hotspot) is blocking the outbound database ports. Connect to a standard home Wi-Fi network or use a VPN to bypass the block.
- **"EADDRINUSE":** Make sure you don't have multiple instances of the servers running in the background. Close your terminals and try again.
