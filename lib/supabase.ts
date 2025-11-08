/**
 * 🔒 CORE UTILITY - DO NOT DELETE (if using Supabase)
 *
 * Supabase database client configuration.
 * Keep this if you're using Supabase for your app's database.
 * You can remove this entire file if you're not using Supabase.
 */

import { createClient } from "@supabase/supabase-js";

/**
 * Supabase Configuration
 * Initialize with environment variables from .env.local
 */
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

/**
 * Create Supabase client
 * This can be used in both server and client components
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Helper to check if Supabase is properly configured
 */
export function isSupabaseConfigured(): boolean {
  return Boolean(supabaseUrl && supabaseAnonKey);
}

/**
 * Get Supabase client with error handling
 */
export function getSupabaseClient() {
  return supabase;
}
