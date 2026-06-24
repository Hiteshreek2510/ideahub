# IdeaHub Setup Guide

Welcome to IdeaHub! Follow these instructions to run the application on your local machine using Supabase for the database and file storage.

## Prerequisites
- **Node.js**: Make sure you have Node.js (v18+) installed.
- **Supabase Account**: You can use the pre-configured Supabase project provided below, or create your own at [supabase.com](https://supabase.com).

## Environment Variables

### Backend (`/backend/.env`)
Create a `.env` file in the `backend/` directory with the following variables:

```env
# Connect to Supabase via connection pooling
DATABASE_URL="postgresql://postgres.lsdtiujbnslippmvdqhe:sxtpuHZUYrLodzHx@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true"

# Direct connection to the database. Used for migrations
DIRECT_URL="postgresql://postgres.lsdtiujbnslippmvdqhe:sxtpuHZUYrLodzHx@aws-0-ap-northeast-1.pooler.supabase.com:5432/postgres"

# Supabase URL and Key for Storage
SUPABASE_URL="https://lsdtiujbnslippmvdqhe.supabase.co"
SUPABASE_KEY="sb_publishable_CIuvCpfQAIXs-FG_MT5SZg_qRGLTh6q"

# JWT Secret for Auth
JWT_SECRET="super-secret-jwt-key-ideahub-2026"

# Frontend URL for CORS
FRONTEND_URL="http://localhost:3000"
```

### Frontend (`/frontend/.env.local`)
Create a `.env.local` file in the `frontend/` directory with the following variables:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_SUPABASE_URL=https://lsdtiujbnslippmvdqhe.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_CIuvCpfQAIXs-FG_MT5SZg_qRGLTh6q
```

---

## Installation & Setup

1. **Install Backend Dependencies & Push Database**
   Open a terminal, navigate to the `backend` folder, and run:
   ```bash
   cd backend
   npm install
   npx prisma db push
   npx prisma generate
   ```

2. **Start the Backend Server**
   ```bash
   npm run start:dev
   ```
   *The backend will now be running on `http://localhost:4000`.*

3. **Install Frontend Dependencies & Start App**
   Open a new terminal window, navigate to the `frontend` folder, and run:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **Visit the App**
   Open your browser and navigate to `http://localhost:3000`. You're all set!

---

## Notes on Storage (Supabase)
This project uses Supabase Storage for storing images, videos, and private encrypted documents. 
If you choose to use your own Supabase project in the future, ensure you create two public buckets:
1. `media` (for post attachments)
2. `documents` (for private documents)
