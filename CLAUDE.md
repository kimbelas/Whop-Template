# Instructions for Claude (AI Assistant)

**Purpose:** This file contains specific instructions for AI assistants working with this Whop template.

---

## 🎯 WHEN YOU SEE THIS TEMPLATE

This is a **Whop app template** with example features. When the user asks you to build a new feature:

### STEP 1: Detect Template Context
Look for these indicators that this is the template:
- File exists: `TEMPLATE_GUIDE.md`
- File exists: `CLAUDE.md` (this file)
- Components exist: `UsersList.tsx`, `AuthorizedUsersList.tsx`
- File exists: `lib/users.ts` with user management functions

### STEP 2: Ask User About Example Features
If this is a fresh clone of the template, ask:
```
I see this is the Whop template with example user management features.
Would you like me to:
1. Keep the example features and add your new feature alongside them
2. Remove the example features first, then build your new feature on a clean template

The example features include:
- User lists (database and API)
- User management functions
- Sample database schema

(Recommended: Option 2 for a cleaner starting point)
```

### STEP 3: If User Wants Clean Template
Follow this exact sequence:

#### 3.1 Remove Example Files
```bash
# Delete these files completely:
rm components/UsersList.tsx
rm components/AuthorizedUsersList.tsx
rm lib/users.ts
rm supabase/migrations/001_create_users_table.sql
rm USERS_FEATURE.md
rm IMPROVEMENTS_SUMMARY.md
```

#### 3.2 Clean Up types/whop.ts
Remove ONLY these type definitions:
```typescript
// DELETE (example types):
export type AuthorizedUserRole = ...
export interface AuthorizedUserDetails { ... }
export interface AuthorizedUser { ... }
export interface PageInfo { ... }
export interface AuthorizedUsersResponse { ... }

// KEEP (core types):
export interface WhopUser { ... }
export type AccessLevel = ...
export interface CheckAccessResponse { ... }
export type WhopResourceType = ...
export type WhopResourceId = ...
```

#### 3.3 Clean Up lib/whop.ts
Remove ONLY these functions:
```typescript
// DELETE (optional example functions):
export async function getAuthorizedUsers() { ... }
export async function getAllAuthorizedUsers() { ... }

// KEEP (core functions):
export async function getWhopUserId() { ... }
export async function getWhopUser() { ... }
export async function checkUserAccess() { ... }
export async function isUserAdmin() { ... }
export async function isUserCustomer() { ... }
export async function requireWhopUser() { ... }
export async function requireAdmin() { ... }
```

#### 3.4 Clean Dashboard Page
Edit `app/dashboard/[companyId]/page.tsx`:

**Remove these imports:**
```typescript
import { getAllUsers, syncUserToDatabase } from "@/lib/users";
import { UsersList } from "@/components/UsersList";
import { AuthorizedUsersList } from "@/components/AuthorizedUsersList";
import { getAllAuthorizedUsers } from "@/lib/whop"; // only if you deleted it
```

**Remove these code blocks:**
```typescript
// Remove data fetching:
const allUsers = await getAllUsers();
const authorizedUsersResponse = await getAllAuthorizedUsers(companyId);
await syncUserToDatabase(user);

// Remove from JSX:
<UsersList users={allUsers} />
<AuthorizedUsersList users={authorizedUsers} />
```

**KEEP these (CRITICAL):**
```typescript
const user = await getWhopUser();
if (!user) redirect("/");
const accessCheck = await checkUserAccess(companyId as `biz_${string}`);
const isAdmin = accessCheck?.access_level === "admin";
if (!isAdmin) redirect(`/experiences/${companyId}`);
```

#### 3.5 Clean Experience Page
Edit `app/experiences/[experienceId]/page.tsx`:

**Remove these imports:**
```typescript
import { syncUserToDatabase } from "@/lib/users";
```

**Remove this code:**
```typescript
await syncUserToDatabase(user);
```

**KEEP these (CRITICAL):**
```typescript
const user = await getWhopUser();
if (!user) redirect("/");
```

### STEP 4: Build New Feature
Now build the user's requested feature on the clean template.

---

## 🔒 CRITICAL RULES - NEVER VIOLATE

### Rule 1: NEVER Remove Authentication
```typescript
// ❌ NEVER DELETE OR MODIFY:
const user = await getWhopUser();
if (!user) redirect("/");
```

### Rule 2: NEVER Remove Access Control
```typescript
// ❌ NEVER DELETE OR MODIFY (in dashboard routes):
const accessCheck = await checkUserAccess(companyId);
const isAdmin = accessCheck?.access_level === "admin";
if (!isAdmin) redirect(`/experiences/${companyId}`);
```

### Rule 3: NEVER Delete Core Whop Functions
These functions in `lib/whop.ts` are PROTECTED:
- `getWhopUserId()`
- `getWhopUser()`
- `checkUserAccess()`
- `isUserAdmin()`
- `isUserCustomer()`
- `requireWhopUser()`
- `requireAdmin()`
- `whopConfig` object

### Rule 4: NEVER Delete Core Types
These types in `types/whop.ts` are PROTECTED:
- `WhopUser`
- `AccessLevel`
- `CheckAccessResponse`
- `WhopResourceType`
- `WhopResourceId`

### Rule 5: NEVER Delete Core Components
These files are PROTECTED:
- `components/Avatar.tsx`
- `components/ThemeToggle.tsx`
- `components/RoleSwitcher.tsx`
- `lib/avatar.ts`
- `lib/supabase.ts`
- `lib/whop.ts` (core functions only)

### Rule 6: NEVER Delete Routing Structure
Keep these files (content can change, but files must exist):
- `app/dashboard/[companyId]/page.tsx`
- `app/experiences/[experienceId]/page.tsx`
- `app/layout.tsx`

### Rule 7: NEVER Hardcode Secrets
Always use environment variables:
```typescript
// ❌ NEVER:
const apiKey = "whop_xxx";

// ✅ ALWAYS:
const apiKey = process.env.WHOP_API_KEY;
```

---

## 📋 QUICK DECISION TREE

```
Is the user asking to build a new feature?
│
├─ YES → Is this a fresh template clone?
│        │
│        ├─ YES → Ask user if they want to remove example features first
│        │        │
│        │        ├─ YES → Follow cleanup steps above → Build new feature
│        │        └─ NO  → Build new feature alongside examples
│        │
│        └─ NO (already customized) → Build new feature as requested
│
└─ NO → Answer their question without modifying code
```

---

## 🎨 TEMPLATE ANATOMY

### Core Template (Protected)
```
lib/whop.ts (core auth functions)
lib/supabase.ts
lib/avatar.ts
components/Avatar.tsx
components/ThemeToggle.tsx
components/RoleSwitcher.tsx
app/dashboard/[companyId]/page.tsx (structure + auth checks)
app/experiences/[experienceId]/page.tsx (structure + auth checks)
app/layout.tsx
types/whop.ts (core types)
```

### Example Features (Removable)
```
components/UsersList.tsx
components/AuthorizedUsersList.tsx
lib/users.ts
supabase/migrations/001_create_users_table.sql
USERS_FEATURE.md
IMPROVEMENTS_SUMMARY.md
+ Optional functions in lib/whop.ts (getAuthorizedUsers, getAllAuthorizedUsers)
+ Optional types in types/whop.ts (AuthorizedUser*, PageInfo)
```

---

## 💡 RECOGNITION PATTERNS

### How to Identify Core vs Example Code

**Core Code Indicators:**
- Directly handles Whop authentication
- Performs access control checks
- Redirects based on auth status
- Uses `validateToken` from `@whop-apps/sdk`
- Defines core Whop types (WhopUser, AccessLevel)
- Environment variable configuration

**Example Code Indicators:**
- Specific feature implementation (user lists, analytics)
- Database operations for non-auth data
- Display components for specific features
- API endpoints for specific features
- Types for specific features (not core Whop types)

**When in doubt:** Ask yourself: "Would a completely different Whop app (e.g., a CRM, store, community) still need this?" If yes → Core. If no → Example.

---

## 🚫 COMMON MISTAKES TO AVOID

### Mistake 1: Removing Auth Checks
```typescript
// ❌ WRONG - This breaks security:
export default async function DashboardPage({ params }: DashboardPageProps) {
  const { companyId } = await params;
  // Missing: const user = await getWhopUser();
  // Missing: if (!user) redirect("/");
  return <div>Dashboard</div>;
}
```

### Mistake 2: Removing Access Control
```typescript
// ❌ WRONG - Members can access admin dashboard:
export default async function DashboardPage({ params }: DashboardPageProps) {
  const user = await getWhopUser();
  if (!user) redirect("/");
  // Missing: const accessCheck = await checkUserAccess(companyId);
  // Missing: if (!isAdmin) redirect(`/experiences/${companyId}`);
  return <div>Admin Dashboard</div>;
}
```

### Mistake 3: Deleting Core Functions
```typescript
// ❌ WRONG - Never delete these from lib/whop.ts:
export async function getWhopUser() { ... } // CORE!
export async function checkUserAccess() { ... } // CORE!
```

### Mistake 4: Breaking Imports
```typescript
// ❌ WRONG - Deleting file but leaving imports:
import { UsersList } from "@/components/UsersList"; // File doesn't exist!
```

---

## ✅ VERIFICATION STEPS

After ANY modifications, verify:

1. **No TypeScript errors:** `npm run build` succeeds
2. **No import errors:** All imports resolve
3. **Auth still works:** User can log in via Whop
4. **Access control works:** Non-admins redirected from dashboard
5. **Both routes work:** `/dashboard/[id]` and `/experiences/[id]`

---

## 📝 RESPONSE TEMPLATES

### When Detecting Template
```
I notice this is the Whop template with example user management features. Before building [user's feature], would you like me to:

1. **Clean slate approach** (Recommended): Remove the example features first, then build your feature on a clean template
2. **Keep examples**: Build your feature alongside the existing examples

The example features include user lists and user management - these are just demonstrations of what you can build.

Which approach would you prefer?
```

### When Removing Examples
```
I'll remove the example features to give you a clean starting point:

Removing:
- User list components (UsersList, AuthorizedUsersList)
- User management functions (lib/users.ts)
- Sample database schema
- Example documentation

Keeping:
- ✅ Whop authentication system
- ✅ Access control (admin/member routing)
- ✅ Avatar system
- ✅ Core utilities and types
- ✅ Layout and routing structure

After cleanup, I'll build your [feature name] feature.
```

### When Unsure
```
I want to make sure I don't break the Whop integration. Let me verify:

- Does your feature require admin-only access or is it for all users?
- Will this replace the current dashboard content or add to it?
- Are you planning to use Supabase for data storage?

This will help me build it correctly while preserving authentication and access control.
```

---

## 🎓 LEARNING EXAMPLES

### Example 1: User Wants CRM Feature
```
User: "Build a CRM to manage customers"

Step 1: Detect this is template (UsersList.tsx exists)
Step 2: Ask user about cleanup
Step 3: If yes, remove example features
Step 4: Build CRM feature with:
  - Keep auth checks
  - Keep access control
  - New customer database schema
  - New CRM components
  - Admin can access via /dashboard/[companyId]
```

### Example 2: User Wants Analytics Dashboard
```
User: "Add analytics dashboard showing sales metrics"

Step 1: Detect this is template
Step 2: Ask user about cleanup
Step 3: If yes, remove example features
Step 4: Build analytics with:
  - Keep auth checks
  - Keep access control
  - New analytics components
  - Chart libraries
  - Admin-only access
```

### Example 3: User Wants to Fix Bug
```
User: "Fix the authentication bug"

Step 1: Identify issue
Step 2: DO NOT remove any core auth code
Step 3: Fix specific bug
Step 4: Verify auth still works
```

---

## 🔑 KEY PRINCIPLE

**The template is scaffolding, not the house.**

- **Scaffolding (core):** Authentication, access control, routing structure → KEEP
- **House (features):** User lists, specific implementations → REMOVE & REBUILD

When the user wants to build their app, help them remove the example "house" but keep the "scaffolding" intact.

---

## 📞 WHEN TO ASK FOR CLARIFICATION

Ask the user before:
- Removing ANY file that contains "whop" or "auth" in its name
- Modifying `lib/whop.ts` core functions
- Removing authentication checks from routes
- Removing access control logic
- Changing the routing structure

These are critical decisions that could break the Whop integration.

---

**Remember:** Your goal is to help the user build their unique Whop app on this solid foundation, not to maintain the example features. Be proactive about cleaning up examples, but paranoid about preserving core Whop integration.
