# IdeaHub Setup Guide

Welcome to IdeaHub! This guide will walk you through setting up the project locally. 

IdeaHub uses a **NestJS** backend, a **Next.js** frontend, and **Supabase** for the database (PostgreSQL) and media storage.

## Prerequisites

- Node.js (v18+)
- npm (v9+)
- A Supabase account (free tier is fine)

## 1. Supabase Setup

1. Create a new project in your Supabase dashboard.
2. In the Supabase SQL editor, run the following to enable the required extensions (if not already enabled) and create a public bucket for media uploads:
   ```sql
   -- You can also just create the bucket manually via the Supabase UI (Storage -> New Bucket -> 'ideahub-media', make sure it is PUBLIC)
   insert into storage.buckets (id, name, public) values ('ideahub-media', 'ideahub-media', true);
   ```

## 2. Environment Variables

You'll need to create a `.env` file in **both** the backend and frontend directories.

### Backend (`backend/.env`)

```env
# Supabase PostgreSQL Connection String (Transaction mode)
# You can find this in Supabase -> Project Settings -> Database -> Connection string -> URI
DATABASE_URL="postgresql://postgres.[YOUR_PROJECT_REF]:[YOUR_PASSWORD]@aws-0-REGION.pooler.supabase.com:6543/postgres?pgbouncer=true"

# Supabase URL and Key for Storage
# You can find this in Supabase -> Project Settings -> API
SUPABASE_URL="https://[YOUR_PROJECT_REF].supabase.co"
SUPABASE_KEY="your-anon-or-service-role-key"

# JWT Secret for Auth
JWT_SECRET="generate-a-strong-random-secret-key-here"

# Frontend URL for CORS
FRONTEND_URL="http://localhost:3000"
```

### Frontend (`frontend/.env.local`)

```env
# Point to your local NestJS backend
NEXT_PUBLIC_API_URL="http://localhost:4000"
```

*(Note: In Next.js, `.env.local` is standard for local environment variables.)*

## 3. Backend Setup

Open a terminal and navigate to the `backend` folder:

```bash
cd backend

# 1. Install dependencies
npm install

# 2. Push the Prisma schema to your Supabase PostgreSQL database
# This will automatically create all the necessary tables!
npx prisma db push

# 3. Generate the Prisma Client
npx prisma generate

# 4. Start the backend development server
npm run start:dev
```
*The backend will be running at `http://localhost:4000`.*

## 4. Frontend Setup

Open a second terminal and navigate to the `frontend` folder:

```bash
cd frontend

# 1. Install dependencies
npm install

# 2. Start the frontend development server
npm run dev
```
*The frontend will be running at `http://localhost:3000`.*

## 5. You're ready to go!

Open [http://localhost:3000](http://localhost:3000) in your browser. 
1. Create a new account.
2. Update your profile picture (which will be uploaded to Supabase Storage).
3. Start posting ideas and building teams!
