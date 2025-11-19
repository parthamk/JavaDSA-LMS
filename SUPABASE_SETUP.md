# Supabase Integration Guide

This guide explains how to set up Supabase for the JavaDSA Learn LMS backend.

---

## Step 1: Create a Supabase Project

1. Go to [Supabase](https://supabase.com/) and sign up or log in.
2. Click **"New Project"** to create a new project.
3. Fill in the project details:
   - **Project Name**: JavaDSA-LMS
   - **Database Password**: Create a strong password and save it
   - **Region**: Choose a region closest to your users
4. Click **"Create new project"** and wait for the database to be set up (this may take a few minutes).

---

## Step 2: Get Your Credentials

1. After the project is created, go to **Settings** > **API**.
2. You'll find:
   - **Project URL**: Copy this value
   - **Anon Public Key**: Copy this value
3. These will be used for `SUPABASE_URL` and `SUPABASE_KEY` in your `.env` file.

---

## Step 3: Create Database Tables

Go to the **SQL Editor** in your Supabase dashboard and run the following SQL queries:

### Create `users` Table

```sql
create table users (
  id uuid primary key default gen_random_uuid(),
  username varchar(255) unique not null,
  email varchar(255) unique not null,
  password varchar(255) not null,
  created_at timestamp default now(),
  last_login timestamp
);
```

### Create `progress` Table

```sql
create table progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  course_id varchar(50) not null,
  sections_completed jsonb default '[]'::jsonb,
  bookmarks jsonb default '[]'::jsonb,
  notes jsonb default '{}'::jsonb,
  progress_percentage integer default 0,
  last_accessed timestamp default now(),
  created_at timestamp default now(),
  updated_at timestamp default now(),
  unique(user_id, course_id)
);

-- Create index for faster queries
create index idx_progress_user_course on progress(user_id, course_id);
```

---

## Step 4: Configure Environment Variables

1. Update your `.env` file in the `backend` directory with:

   ```env
   SUPABASE_URL=your_supabase_url_here
   SUPABASE_KEY=your_supabase_anon_key_here
   ```
2. Replace `your_supabase_url_here` and `your_supabase_anon_key_here` with the values you copied in Step 2.

---

## Step 5: Install Dependencies

In your backend directory, run:

```bash
npm install @supabase/supabase-js
```

---

## Step 6: Test the Connection

1. Start your backend server:

   ```bash
   npm run dev
   ```
2. You should see a message indicating the Supabase connection status:

   - ✓ Supabase connection successful
   - ✗ Supabase connection failed (if credentials are incorrect)

---

## Database Schema

### `users` Table

- `id`: UUID (Primary Key)
- `username`: Unique username
- `email`: Unique email
- `password`: Hashed password
- `created_at`: Account creation timestamp
- `last_login`: Last login timestamp

### `progress` Table

- `id`: UUID (Primary Key)
- `user_id`: Reference to users table
- `course_id`: Course identifier (e.g., "java", "dsa")
- `sections_completed`: JSON array of completed section IDs
- `bookmarks`: JSON array of bookmarked section IDs
- `notes`: JSON object with section IDs as keys and notes as values
- `progress_percentage`: Numeric progress (0-100)
- `last_accessed`: Last access timestamp
- `created_at`: Record creation timestamp
- `updated_at`: Last update timestamp

---

## Features Implemented

### Authentication

- **Register**: Users can create accounts with username, email, and password
- **Login**: Users can log in with email and password
- **Profile**: Users can view their profile and progress

### Progress Tracking

- **Update Progress**: Track completed sections
- **Bookmarks**: Save important sections
- **Notes**: Add personal notes to sections
- **Progress Calculation**: Automatic progress percentage calculation

---

## Deployment to Vercel

1. Add the Supabase environment variables in your Vercel project settings:

   - `SUPABASE_URL`
   - `SUPABASE_KEY`
2. Redeploy your backend application.

---

## Troubleshooting

### Connection Failed

- Verify that `SUPABASE_URL` and `SUPABASE_KEY` are correct
- Check your Supabase project is active
- Ensure your IP is not restricted by Supabase

### User Already Exists Error

- This is expected if trying to register with an existing email or username

### Progress Not Saving

- Ensure the user is authenticated (token is valid)
- Check that the course ID is correct
- Verify the progress table exists with correct schema

---

For more information, visit the [Supabase Documentation](https://supabase.com/docs).
