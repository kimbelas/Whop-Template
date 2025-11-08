# Users Feature Implementation

This document describes the user management features implemented in the admin dashboard.

## Overview

The dashboard now displays comprehensive user information from two sources:
1. **Whop Authorized Users API** - Shows all users with access to your company
2. **Supabase Database** - Tracks users who have logged into your app

## Features Implemented

### 1. Authorized Users from Whop API

**Endpoint:** `GET /api/v1/authorized_users`

**What it shows:**
- All users authorized to access your company
- User roles (owner, admin, sales_manager, moderator, app_manager, support, manager)
- User details: name, username, email, user ID
- Authorization IDs
- Color-coded role badges
- Raw JSON data viewer for testing

**Location:** `/app/dashboard/[companyId]/page.tsx` (line 119)

**Component:** `AuthorizedUsersList.tsx`

**API Function:** `getAllAuthorizedUsers()` in `lib/whop.ts`

### 2. Database Users from Supabase

**What it shows:**
- Users who have logged into your app
- Profile pictures
- Bios
- Join dates
- Last login timestamps
- Automatically synced when users visit the dashboard

**Location:** `/app/dashboard/[companyId]/page.tsx` (line 124)

**Component:** `UsersList.tsx`

**Database Table:** `users` (migration: `supabase/migrations/001_create_users_table.sql`)

## Files Created/Modified

### New Files

1. **`types/whop.ts`** (updated)
   - Added `AuthorizedUser` interface
   - Added `AuthorizedUserRole` type
   - Added `AuthorizedUsersResponse` interface
   - Added `PageInfo` interface

2. **`lib/whop.ts`** (updated)
   - Added `getAuthorizedUsers()` - Fetch authorized users with filters
   - Added `getAllAuthorizedUsers()` - Fetch all authorized users

3. **`lib/users.ts`** (new)
   - `syncUserToDatabase()` - Sync Whop user to database
   - `getAllUsers()` - Get all users from database
   - `getUserById()` - Get single user
   - `getUserCount()` - Count users
   - `deleteUser()` - Delete user

4. **`components/AuthorizedUsersList.tsx`** (new)
   - Displays authorized users table
   - Role badges with color coding
   - Raw JSON data viewer
   - Empty state handling

5. **`components/UsersList.tsx`** (new)
   - Displays database users table
   - Profile pictures
   - Join and login dates
   - Empty state handling

6. **`supabase/migrations/001_create_users_table.sql`** (new)
   - Creates users table
   - Indexes for performance
   - Auto-update triggers

7. **`supabase/README.md`** (new)
   - Setup instructions
   - Schema documentation
   - Troubleshooting guide

8. **`app/dashboard/[companyId]/page.tsx`** (updated)
   - Fetches authorized users from Whop API
   - Syncs current user to database
   - Displays both user lists

## How It Works

### Flow

1. **User logs into dashboard** → Whop validates their token
2. **Dashboard loads** → Fetches current user details from Whop API
3. **User sync** → Current user is synced to Supabase database
4. **Authorized users fetch** → All authorized users are fetched from Whop API
5. **Database users fetch** → All users are fetched from Supabase
6. **Display** → Both lists are displayed on the dashboard

## Setup Required

### 1. Database Migration

Run the SQL migration in your Supabase dashboard:

1. Go to SQL Editor in Supabase
2. Copy content from `supabase/migrations/001_create_users_table.sql`
3. Execute the SQL

### 2. API Permissions

Make sure your Whop API key has these permissions:
- `company:authorized_user:read`
- `member:email:read`

### 3. Environment Variables

Required in `.env.local`:
```env
WHOP_API_KEY=your_whop_api_key_here
NEXT_PUBLIC_WHOP_COMPANY_ID=your_company_id_here
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

## Testing

### View Authorized Users

1. Start dev server: `npm run dev`
2. Log in with Whop account
3. Navigate to `/dashboard/biz_xxxxxx` (your company ID)
4. See the "Authorized Users" section

### View Raw JSON Data

Click "View Raw JSON Data (for testing)" at the bottom of the Authorized Users table to see all the raw API response data.

### Database Users

Users are automatically added to the database when they log in. The list shows:
- Who has logged into your app
- When they first joined
- When they last logged in

## API Reference

### Whop Authorized Users API

**Endpoint:** `GET https://api.whop.com/api/v1/authorized_users?company_id={companyId}`

**Query Parameters:**
- `company_id` (required) - Your company ID
- `user_id` - Filter by specific user
- `role` - Filter by role
- `first` - Limit results
- `after` - Pagination cursor

**Response:**
```typescript
{
  data: [
    {
      id: "string",
      role: "owner" | "admin" | "sales_manager" | "moderator" | "app_manager" | "support" | "manager",
      user: {
        id: "string",
        name: "string",
        username: "string",
        email: "string"
      }
    }
  ],
  page_info: {
    end_cursor: "string",
    start_cursor: "string",
    has_next_page: boolean,
    has_previous_page: boolean
  }
}
```

## Next Steps

### Possible Enhancements

1. **Pagination** - Add pagination controls for large user lists
2. **Filtering** - Add filters for roles, dates, etc.
3. **Search** - Add search functionality
4. **User Actions** - Add buttons to edit/remove users
5. **Export** - Add CSV/Excel export
6. **User Details Page** - Add individual user detail pages
7. **Analytics** - Add user activity charts and metrics
8. **Sync Improvements** - Sync authorized users to database for offline access

## Troubleshooting

### No Authorized Users Showing

- Check your WHOP_API_KEY has correct permissions
- Verify company_id is correct
- Check browser console for API errors
- Make sure you have authorized users in your Whop company

### Database Users Not Showing

- Run the Supabase migration
- Check Supabase connection in `.env.local`
- Verify table was created in Supabase dashboard
- Check browser console for database errors
