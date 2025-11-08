# Component Template Guide

This file explains which components are core template vs example features.

## 🔒 CORE COMPONENTS - DO NOT DELETE

These components are essential for Whop integration and app functionality:

- **Avatar.tsx** - Reusable avatar component with fallbacks
  - Used throughout the app
  - Handles profile pictures, generated avatars, and initials
  - Required for consistent UI

- **ThemeToggle.tsx** - Dark/light mode switcher
  - Required for Whop App Store (must support both themes)
  - Manages theme state
  - DO NOT DELETE

- **RoleSwitcher.tsx** - Admin/member testing helper
  - Useful for development and testing
  - Helps switch between views
  - Can remove in production if not needed

## 📝 EXAMPLE COMPONENTS - SAFE TO DELETE

These components demonstrate specific features but aren't required:

- **UsersList.tsx** - Displays database users in a table
  - Example feature showing Supabase integration
  - Safe to delete when building your own features

- **AuthorizedUsersList.tsx** - Displays Whop authorized users
  - Example feature showing Whop API integration
  - Safe to delete when building your own features

## When Adding Your Components

Create your own components in this directory for your specific features. The template structure is flexible - you can organize components however you prefer.
