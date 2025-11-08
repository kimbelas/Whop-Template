# Supabase Setup

This directory contains database migrations for your Whop app.

## Setup Instructions

### 1. Create Supabase Project

If you haven't already:
1. Go to [Supabase](https://supabase.com)
2. Create a new project
3. Note down your project URL and anon key

### 2. Configure Environment Variables

Make sure your `.env.local` file has:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### 3. Run Migrations

You can run the migrations in two ways:

#### Option 1: Using Supabase Dashboard (Recommended)

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor** in the sidebar
3. Open the migration file: `migrations/001_create_users_table.sql`
4. Copy the SQL content
5. Paste it into the SQL Editor
6. Click **Run** to execute the migration

#### Option 2: Using Supabase CLI

If you have the Supabase CLI installed:

```bash
# Install Supabase CLI (if not already installed)
npm install -g supabase

# Link to your project
supabase link --project-ref your-project-ref

# Run migrations
supabase db push
```

## Database Schema

### Users Table

Stores user information synced from Whop:

| Column              | Type        | Description                           |
| ------------------- | ----------- | ------------------------------------- |
| id                  | TEXT        | Whop user ID (Primary Key)            |
| username            | TEXT        | Whop username                         |
| name                | TEXT        | User's display name                   |
| bio                 | TEXT        | User biography                        |
| profile_picture_url | TEXT        | URL to profile picture                |
| created_at          | TIMESTAMPTZ | When user was first added to database |
| updated_at          | TIMESTAMPTZ | Last update timestamp                 |
| last_login_at       | TIMESTAMPTZ | Last time user logged in              |

### How It Works

1. When a user visits the dashboard, their Whop data is automatically synced to the database
2. The `syncUserToDatabase()` function creates or updates their record
3. The admin dashboard displays all users from the database
4. The `updated_at` timestamp is automatically updated on any record changes

## Next Steps

After running the migration:

1. Start your development server: `npm run dev`
2. Log in with your Whop account
3. Visit the admin dashboard at `/dashboard/{companyId}`
4. You should see yourself in the users list!

## Troubleshooting

**Error: relation "users" does not exist**

- Make sure you ran the migration in your Supabase project
- Check that your `.env.local` has the correct Supabase credentials

**Users not showing up**

- Verify the migration ran successfully in Supabase
- Check the browser console for any errors
- Make sure you're logged in with Whop

**Connection errors**

- Verify your Supabase URL and anon key are correct
- Check that your Supabase project is running
