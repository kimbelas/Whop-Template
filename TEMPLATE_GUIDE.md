# Whop Template Guide - What to Keep vs Remove

This guide helps developers and AI assistants understand what's **core template functionality** (must keep) versus **example features** (safe to remove when building your app).

---

## 🔒 CORE TEMPLATE - **NEVER REMOVE OR MODIFY**

These are essential for Whop integration. Removing these will break your app.

### Authentication & Authorization

#### Files: **PROTECTED - DO NOT DELETE**
- `lib/whop.ts` - Core Whop API functions
  - ✅ `getWhopUserId()` - Token validation
  - ✅ `getWhopUser()` - User data fetching
  - ✅ `checkUserAccess()` - Access control
  - ✅ `isUserAdmin()` - Admin checking
  - ✅ `requireWhopUser()` - Auth guard
  - ✅ `requireAdmin()` - Admin guard
  - ✅ `whopConfig` - Configuration object

#### Core Concepts: **MUST MAINTAIN**
- Authentication flow using `validateToken` from `@whop-apps/sdk`
- Access control checks for admin vs member routes
- Redirect logic for unauthorized users
- Environment variable usage for API keys

### Routing Structure

#### Files: **PROTECTED - DO NOT DELETE**
- `app/dashboard/[companyId]/page.tsx` - Admin route structure
- `app/experiences/[experienceId]/page.tsx` - Member route structure
- `app/layout.tsx` - Root layout with theme

#### Core Pattern: **MUST MAINTAIN**
```typescript
// This pattern MUST stay in dashboard routes:
const user = await getWhopUser();
if (!user) redirect("/");

const accessCheck = await checkUserAccess(companyId);
const isAdmin = accessCheck?.access_level === "admin";
if (!isAdmin) redirect(`/experiences/${companyId}`);
```

### UI Components

#### Files: **PROTECTED - DO NOT DELETE**
- `components/Avatar.tsx` - Reusable avatar component
- `components/ThemeToggle.tsx` - Dark/light mode toggle
- `components/RoleSwitcher.tsx` - Admin/member testing helper
- `lib/avatar.ts` - Avatar utility functions

### Core Utilities

#### Files: **PROTECTED - DO NOT DELETE**
- `lib/supabase.ts` - Database client (if using Supabase)
- `types/whop.ts` - Core Whop types
  - ✅ `WhopUser` interface
  - ✅ `AccessLevel` type
  - ✅ `CheckAccessResponse` interface
  - ✅ `WhopResourceType` type
  - ✅ `WhopResourceId` type

### Configuration

#### Files: **PROTECTED - DO NOT DELETE**
- `.env.example` - Environment template
- `next.config.ts` - Next.js config
- `tailwind.config.ts` - Tailwind config (if exists)
- `tsconfig.json` - TypeScript config
- `package.json` - Dependencies

#### Required Environment Variables:
```env
WHOP_API_KEY=
NEXT_PUBLIC_WHOP_APP_ID=
```

---

## 📝 EXAMPLE FEATURES - **SAFE TO REMOVE**

These are demonstration features showing what you CAN build. Remove them when building your own app.

### User Management Features (Example Implementation)

#### Files: **SAFE TO DELETE**
- ❌ `components/UsersList.tsx` - Database users display component
- ❌ `components/AuthorizedUsersList.tsx` - Whop API users display component
- ❌ `lib/users.ts` - User management functions (entire file)
- ❌ `supabase/migrations/001_create_users_table.sql` - Example users table
- ❌ `USERS_FEATURE.md` - Documentation for user feature

#### Code in `lib/whop.ts`: **SAFE TO DELETE**
```typescript
// These functions are OPTIONAL examples - safe to remove:
- getAuthorizedUsers()
- getAllAuthorizedUsers()
```

#### Code in `types/whop.ts`: **SAFE TO DELETE**
```typescript
// These types are OPTIONAL examples - safe to remove:
- AuthorizedUserRole
- AuthorizedUserDetails
- AuthorizedUser
- PageInfo
- AuthorizedUsersResponse
```

**Why Safe:** These demonstrate Whop's authorized users API but aren't required for basic app functionality.

### Dashboard Content (Example Placeholders)

#### In `app/dashboard/[companyId]/page.tsx`: **SAFE TO DELETE**

```typescript
// These sections are just examples:

❌ User welcome card (lines ~52-89) - Replace with your own
❌ Analytics/Content/Settings cards (lines ~91-112) - Replace with your features
❌ <UsersList users={allUsers} /> - Remove if not using
❌ <AuthorizedUsersList users={authorizedUsers} /> - Remove if not using
```

**Keep:** The authentication checks, access control, and basic page structure.

### Experience Page Content (Example Placeholders)

#### In `app/experiences/[experienceId]/page.tsx`: **SAFE TO DELETE**

```typescript
// These sections are just examples:

❌ User welcome card (lines ~36-59) - Replace with your own
❌ "Your Content" and "Community" cards (lines ~61-75) - Replace with your features
```

**Keep:** The authentication check and basic page structure.

### Documentation Files

#### Files: **SAFE TO DELETE**
- ❌ `USERS_FEATURE.md` - Specific to user management example
- ❌ `IMPROVEMENTS_SUMMARY.md` - Historical documentation
- ❌ `PRODUCTION_CHECKLIST.md` - Keep only if helpful, or customize
- ❌ `TEMPLATE_GUIDE.md` - This file (delete after understanding)
- ❌ `CLAUDE.md` - AI instructions (delete after cloning)

**Keep:** `README.md` (but customize for your app)

---

## 🎯 HOW TO SAFELY REMOVE EXAMPLE FEATURES

### Step 1: Remove Example Components

```bash
# Safe to delete these files:
rm components/UsersList.tsx
rm components/AuthorizedUsersList.tsx
rm lib/users.ts
rm supabase/migrations/001_create_users_table.sql
rm USERS_FEATURE.md
```

### Step 2: Clean Up Types

Edit `types/whop.ts`:
```typescript
// DELETE these lines (example types):
export type AuthorizedUserRole = ...
export interface AuthorizedUserDetails { ... }
export interface AuthorizedUser { ... }
export interface PageInfo { ... }
export interface AuthorizedUsersResponse { ... }
```

### Step 3: Clean Up API Functions

Edit `lib/whop.ts`:
```typescript
// DELETE these functions (optional examples):
export async function getAuthorizedUsers() { ... }
export async function getAllAuthorizedUsers() { ... }
```

### Step 4: Update Dashboard Page

Edit `app/dashboard/[companyId]/page.tsx`:
```typescript
// REMOVE these imports:
import { getAllUsers, syncUserToDatabase } from "@/lib/users"; // ❌
import { UsersList } from "@/components/UsersList"; // ❌
import { AuthorizedUsersList } from "@/components/AuthorizedUsersList"; // ❌
import { getAllAuthorizedUsers } from "@/lib/whop"; // ❌ (only if you removed it)

// REMOVE these data fetches:
const allUsers = await getAllUsers(); // ❌
const authorizedUsersResponse = await getAllAuthorizedUsers(companyId); // ❌
await syncUserToDatabase(user); // ❌ (if not using database)

// REMOVE these components from JSX:
<UsersList users={allUsers} /> // ❌
<AuthorizedUsersList users={authorizedUsers} /> // ❌

// KEEP these (core functionality):
const user = await getWhopUser(); // ✅
if (!user) redirect("/"); // ✅
const accessCheck = await checkUserAccess(companyId); // ✅
const isAdmin = accessCheck?.access_level === "admin"; // ✅
if (!isAdmin) redirect(`/experiences/${companyId}`); // ✅
```

### Step 5: Update Experience Page

Edit `app/experiences/[experienceId]/page.tsx`:
```typescript
// REMOVE these imports if not using:
import { syncUserToDatabase } from "@/lib/users"; // ❌
await syncUserToDatabase(user); // ❌

// KEEP these (core functionality):
const user = await getWhopUser(); // ✅
if (!user) redirect("/"); // ✅
```

---

## ✅ VERIFICATION CHECKLIST

After removing example features, verify:

### Core Functionality Still Works:
- [ ] App starts without errors (`npm run dev`)
- [ ] User can authenticate via Whop
- [ ] Dashboard route requires admin access
- [ ] Experience route requires authentication
- [ ] Non-admins are redirected from dashboard
- [ ] Avatar component still works
- [ ] Theme toggle still works
- [ ] Light and dark modes both work

### Clean Build:
- [ ] No TypeScript errors (`npm run build`)
- [ ] No import errors for deleted files
- [ ] No references to removed types
- [ ] No calls to removed functions

---

## 🚨 COMMON MISTAKES TO AVOID

### ❌ DON'T DO THIS:

1. **Don't delete authentication checks**
   ```typescript
   // ❌ NEVER REMOVE:
   const user = await getWhopUser();
   if (!user) redirect("/");
   ```

2. **Don't delete access control**
   ```typescript
   // ❌ NEVER REMOVE:
   const accessCheck = await checkUserAccess(companyId);
   if (!isAdmin) redirect(`/experiences/${companyId}`);
   ```

3. **Don't delete core Whop functions**
   ```typescript
   // ❌ NEVER DELETE from lib/whop.ts:
   - getWhopUserId()
   - getWhopUser()
   - checkUserAccess()
   - isUserAdmin()
   ```

4. **Don't delete the routing structure**
   - Keep `/dashboard/[companyId]/page.tsx` file
   - Keep `/experiences/[experienceId]/page.tsx` file
   - Keep the file structure even if you change content

5. **Don't hardcode API keys**
   ```typescript
   // ❌ NEVER DO THIS:
   const apiKey = "whop_xxx"; // BAD!

   // ✅ ALWAYS DO THIS:
   const apiKey = process.env.WHOP_API_KEY; // GOOD!
   ```

---

## 🎨 WHAT TO BUILD INSTEAD

After removing example features, add YOUR features:

### In Dashboard (`/dashboard/[companyId]`):
- Your admin-specific functionality
- Analytics for your use case
- Management tools
- Configuration panels
- Your custom components

### In Experience (`/experiences/[experienceId]`):
- Your member-facing features
- Content delivery
- Interactive tools
- User-specific functionality
- Your custom components

### Your Own Database Schema:
- Design tables for YOUR data
- Not just "users" - your actual business data
- Keep the Supabase client setup, just change the schema

---

## 📋 QUICK REFERENCE

### Files You Can NEVER Delete:
```
lib/whop.ts (core functions only)
lib/supabase.ts
lib/avatar.ts
components/Avatar.tsx
components/ThemeToggle.tsx
components/RoleSwitcher.tsx
app/dashboard/[companyId]/page.tsx (structure)
app/experiences/[experienceId]/page.tsx (structure)
app/layout.tsx
types/whop.ts (core types only)
.env.example
next.config.ts
package.json
```

### Files You Can Delete:
```
components/UsersList.tsx
components/AuthorizedUsersList.tsx
lib/users.ts
supabase/migrations/001_create_users_table.sql
USERS_FEATURE.md
IMPROVEMENTS_SUMMARY.md
TEMPLATE_GUIDE.md (this file)
CLAUDE.md
```

### Code Patterns You Must Keep:
```typescript
// Authentication
const user = await getWhopUser();
if (!user) redirect("/");

// Access Control (in dashboard)
const accessCheck = await checkUserAccess(companyId);
const isAdmin = accessCheck?.access_level === "admin";
if (!isAdmin) redirect(`/experiences/${companyId}`);

// Environment Variables
process.env.WHOP_API_KEY
process.env.NEXT_PUBLIC_WHOP_APP_ID
```

---

## 🤖 FOR AI ASSISTANTS

When a user asks you to build a new feature on this template:

1. **First, identify and remove example features** (UsersList, AuthorizedUsersList, etc.)
2. **Keep all core Whop integration** (auth, access control, routing)
3. **Build the new feature** using the clean template structure
4. **Maintain authentication checks** on all routes
5. **Maintain access control** between admin and member routes

**Think of it this way:**
- **Core = The Whop integration plumbing** (must stay)
- **Example = Sample features showing how to use the plumbing** (remove and replace)

---

## 💡 SUMMARY

**CORE (Keep):** Authentication, access control, routing structure, avatar system, core utilities

**EXAMPLE (Remove):** User lists, user management functions, placeholder cards, sample database schema

**PRINCIPLE:** If it's related to Whop authentication/authorization or the basic Next.js structure, keep it. If it's a specific feature implementation (like user lists), it's an example you can remove.

When in doubt, check: "Would my app work without this?" If the answer is "yes, but I'd need to build my own features," then it's safe to remove.
