# Engage Flow - Generic Whop App Template

A production-ready Next.js template for building Whop apps with full API integration, Whop SDK, iframe support, TypeScript, Tailwind CSS, and Supabase.

> **📝 Note:** This template includes example features (user management) to demonstrate best practices. When building your app, you should remove these examples and add your own features. See [Template Usage](#-template-usage) below.

## Features

- ✅ **Complete Whop Integration** - Full API with user model, access control, and authentication
- ✅ **Dev Proxy Setup** - Run localhost inside Whop iframe with automatic token injection
- ✅ **Iframe SDK** - Client-side communication with Whop platform
- ✅ **Frosted UI Ready** - Optional Whop component library integration
- ✅ **Supabase Database** - Pre-configured database connection
- ✅ **Light & Dark Mode** - Full theme support (required for Whop)
- ✅ **Admin & Member Views** - Both required Whop routes configured
- ✅ **Role Switcher** - Easy testing between admin/member views
- ✅ **TypeScript** - Full type safety with Whop types
- ✅ **Tailwind CSS v4** - Modern styling
- ✅ **Next.js 16** - Latest App Router features

## Project Structure

```
whop-template/
├── app/
│   ├── dashboard/[companyId]/      # Admin/Creator Dashboard
│   │   └── page.tsx
│   ├── experiences/[experienceId]/ # Member Experience View
│   │   └── page.tsx
│   ├── layout.tsx                  # Root layout with components
│   ├── page.tsx                    # Home/landing page
│   └── globals.css                 # Global styles & Tailwind
├── components/
│   ├── RoleSwitcher.tsx            # Toggle admin/member for testing
│   └── ThemeToggle.tsx             # Light/dark/system theme switcher
├── lib/
│   ├── whop.ts                     # Whop API utilities
│   └── supabase.ts                 # Supabase client config
├── types/
│   └── whop.ts                     # Whop type definitions
├── .env.example                    # Environment variables template
└── .env.local                      # Your local environment (git-ignored)
```

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env.local` and fill in your credentials:

**Whop Configuration:**
1. Go to [Whop Developer Dashboard](https://whop.com/apps)
2. Create a new app
3. Get your API keys from the dashboard
4. Add them to `.env.local`:

```env
WHOP_API_KEY=your_whop_api_key_here
WHOP_CLIENT_ID=your_client_id_here
WHOP_CLIENT_SECRET=your_client_secret_here
WHOP_APP_ID=your_app_id_here
```

**Supabase Configuration:**
1. Go to [Supabase](https://supabase.com)
2. Create a new project
3. Get your project URL and anon key from Settings > API
4. Add them to `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### 3. Run with Whop Dev Proxy

The dev proxy allows you to run your app inside Whop iframe with automatic authentication:

```bash
npm run dev
```

This runs: `whop-proxy --command 'next dev --turbopack'`

The proxy will:
- Start on port 3000
- Inject Whop user tokens into headers
- Enable testing inside actual Whop dashboard

**Local Testing (without proxy):**
```bash
npm run dev:local
```

## Whop Integration

### Dev Proxy

The Whop dev proxy is configured in `package.json`:

```json
{
  "scripts": {
    "dev": "whop-proxy --command 'next dev --turbopack'",
    "dev:local": "next dev --turbopack"
  }
}
```

**How it works:**
1. Proxy listens on port 3000
2. Forwards requests to your Next.js app
3. Automatically injects `whop_user_token` cookie
4. Enables testing inside Whop iframe

### Authentication & User API

The template includes complete Whop user integration:

```typescript
import { getWhopUser, checkUserAccess, isUserAdmin } from "@/lib/whop";

// Get current authenticated user
const user = await getWhopUser();
// Returns: { id, username, name, bio, profile_picture, created_at }

// Check access to a resource
const access = await checkUserAccess("exp_123");
// Returns: { has_access: boolean, access_level: "admin" | "customer" | "no_access" }

// Check if user is admin
const isAdmin = await isUserAdmin("biz_123");
```

**Available Functions:**
- `getWhopUserId()` - Get just the user ID from token validation
- `getWhopUser(userId?)` - Fetch full user details from API
- `checkUserAccess(resourceId, userId?)` - Check access to resource
- `isUserAdmin(resourceId, userId?)` - Check if user has admin access
- `isUserCustomer(resourceId, userId?)` - Check if user is customer
- `requireWhopUser()` - Get user or throw error
- `requireAdmin(resourceId, userId?)` - Require admin or throw error

### Whop User Model

Full TypeScript types in `types/whop.ts`:

```typescript
interface WhopUser {
  id: string;                    // user_xxx
  username: string;
  name: string | null;
  created_at: string;
  bio: string | null;
  profile_picture: {
    url: string;
  } | null;
}

type AccessLevel = "no_access" | "admin" | "customer";
```

### Iframe SDK (Optional)

For client-side features like in-app purchases and external URLs:

```typescript
"use client";
import { useIframeSdk } from "@whop/react";

function MyComponent() {
  const sdk = useIframeSdk();

  // Open external URL
  await sdk.openExternalUrl("https://example.com");

  // Trigger in-app purchase
  await sdk.inAppPurchase({ checkoutId: "..." });
}
```

**Setup:**
1. Wrap app in `WhopIframeSdkProvider` (already done in layout if needed)
2. Use `useIframeSdk()` hook in client components

### Frosted UI (Optional)

Whop's official component library built on Radix UI:

```bash
npm install --legacy-peer-deps @frosted-ui/icons
```

Then use Frosted components:

```tsx
import { Button, Text, Heading, Card } from "@whop/react";

<Card>
  <Heading size="6">Title</Heading>
  <Text size="3">Content</Text>
  <Button>Action</Button>
</Card>
```

## Usage

### Testing Views

Use the **Role Switcher** (top right) to toggle between:
- **Admin Mode** - Dashboard view at `/dashboard/[companyId]`
- **Member Mode** - Experience view at `/experiences/[experienceId]`

Use the **Theme Toggle** (bottom right) to switch between:
- 🌞 Light mode
- 🌙 Dark mode
- 💻 System preference

### Adding Features

This template provides the foundation. Add your features by:

1. **Admin Features** - Edit `app/dashboard/[companyId]/page.tsx`
2. **Member Features** - Edit `app/experiences/[experienceId]/page.tsx`
3. **Shared Components** - Add to `components/`
4. **API Routes** - Create in `app/api/`
5. **Database Queries** - Use the Supabase client from `lib/supabase.ts`
6. **Whop API Calls** - Use helpers from `lib/whop.ts`

## Required Routes

Whop apps **must** have these routes (already created):
- `/dashboard/[companyId]` - Creator/admin dashboard
- `/experiences/[experienceId]` - Member experience

Configure these in your Whop app dashboard under "Hosting" settings.

## Scripts

```bash
npm run dev        # Start with Whop dev proxy (recommended)
npm run dev:local  # Start without proxy (local testing only)
npm run build      # Build for production
npm run start      # Run production build
npm run lint       # Run ESLint
```

## 📝 Template Usage

This template includes example features to demonstrate best practices. When building your own app:

### What to Keep (Core Template)

**🔒 NEVER REMOVE - Required for Whop integration:**
- Authentication system (`lib/whop.ts` core functions)
- Access control (admin/member routing)
- Avatar system (`lib/avatar.ts`, `components/Avatar.tsx`)
- Core types (`types/whop.ts` - WhopUser, AccessLevel, etc.)
- Routing structure (`app/dashboard`, `app/experiences`)
- Theme components (ThemeToggle, RoleSwitcher)

### What to Remove (Example Features)

**📝 SAFE TO DELETE - Example implementations:**
- `components/UsersList.tsx` - Database users display
- `components/AuthorizedUsersList.tsx` - API users display
- `lib/users.ts` - User management functions
- `supabase/migrations/001_create_users_table.sql` - Sample database
- Optional functions in `lib/whop.ts` (getAuthorizedUsers, getAllAuthorizedUsers)
- Optional types in `types/whop.ts` (AuthorizedUser*, PageInfo)

### Files with Detailed Instructions

Look for these markers in the code:
- 🔒 **CORE** - Do not remove
- 📝 **EXAMPLE** - Safe to remove

**Comprehensive Guides:**
- `TEMPLATE_GUIDE.md` - Detailed removal instructions for developers
- `CLAUDE.md` - Instructions for AI assistants
- Code comments throughout mark core vs example code

### Quick Start for Your App

1. **Clone and clean:**
   ```bash
   # Remove example features (optional, recommended):
   rm components/UsersList.tsx
   rm components/AuthorizedUsersList.tsx
   rm lib/users.ts
   rm supabase/migrations/001_create_users_table.sql
   ```

2. **Clean up imports in dashboard/experience pages**
   - Remove imports of deleted components
   - Keep authentication and access control code

3. **Build your features**
   - Add your components to `components/`
   - Add your API routes to `app/api/`
   - Add your database schema to `supabase/migrations/`
   - Keep using the authentication patterns

**See `TEMPLATE_GUIDE.md` for step-by-step instructions.**

## Deployment

### 1. Build and Test

```bash
npm run build
npm run start
```

### 2. Deploy to Vercel (Recommended)

1. Push to GitHub
2. Import to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### 3. Configure Whop Dashboard

1. Go to your app settings
2. Set "Base URL" to your deployed URL
3. Configure view paths:
   - Dashboard: `/dashboard/[companyId]`
   - Experience: `/experiences/[experienceId]`

### Whop App Store Requirements

Before submitting:
- ✅ Works end-to-end without bugs
- ✅ Uses Whop authentication (no separate sign-in)
- ✅ Not just a redirect to external platform
- ✅ Only requests necessary permissions
- ✅ **Polished in both light and dark mode** (use theme toggle to test)
- ✅ Complete branding (icon, description, screenshots, demo video)

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Database:** Supabase
- **Whop Integration:**
  - `@whop-apps/sdk` - Authentication
  - `@whop-apps/dev-proxy` - Development proxy
  - `@whop/iframe` - Client-side iframe SDK
  - `@whop/react` - Frosted UI components (optional)
- **Deployment:** Vercel (recommended)

## Resources

- [Whop App Documentation](https://docs.whop.com/apps)
- [Whop API Reference](https://docs.whop.com/api-reference)
- [Whop Dev Proxy Guide](https://docs.whop.com/apps/guides/dev-proxy)
- [Whop Iframe SDK](https://docs.whop.com/apps/guides/iframe)
- [Frosted UI Components](https://docs.whop.com/apps/guides/frosted_ui)
- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## Troubleshooting

**User not authenticated:**
- Make sure you're running with `npm run dev` (with dev proxy)
- Verify your Whop API keys are set in `.env.local`
- Check that you're accessing the app through Whop iframe

**Dev proxy not working:**
- Ensure `@whop-apps/dev-proxy` is installed as dev dependency
- Try clearing cache and restarting: `rm -rf .next && npm run dev`

**Dark mode not working:**
- Use the theme toggle (bottom right) to switch themes
- Verify globals.css has dark mode styles

## License

MIT

---

Built with ❤️ for the Whop ecosystem
