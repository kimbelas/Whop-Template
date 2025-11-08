import { getSupabaseClient } from "./supabase";
import { generateAvatarUrl } from "./avatar";
import type { WhopUser } from "@/types/whop";

/**
 * Database user type (stored in Supabase)
 */
export interface DatabaseUser {
  id: string;
  username: string;
  name: string | null;
  bio: string | null;
  profile_picture_url: string | null;
  created_at: string;
  updated_at: string;
  last_login_at: string | null;
}

/**
 * Sync a Whop user to the Supabase database
 * Creates or updates the user record
 */
export async function syncUserToDatabase(
  whopUser: WhopUser
): Promise<DatabaseUser | null> {
  try {
    const supabase = getSupabaseClient();

    // Generate avatar URL if no profile picture exists
    const avatarUrl =
      whopUser.profile_picture?.url || generateAvatarUrl(whopUser.username);

    const userData = {
      id: whopUser.id,
      username: whopUser.username,
      name: whopUser.name,
      bio: whopUser.bio,
      profile_picture_url: avatarUrl,
      last_login_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from("users")
      .upsert(userData, {
        onConflict: "id",
        ignoreDuplicates: false,
      })
      .select()
      .single();

    if (error) {
      return null;
    }

    return data;
  } catch (error) {
    return null;
  }
}

/**
 * Get all users from the database
 */
export async function getAllUsers(): Promise<DatabaseUser[]> {
  try {
    const supabase = getSupabaseClient();

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return [];
    }

    return data || [];
  } catch (error) {
    return [];
  }
}

/**
 * Get a single user from the database
 */
export async function getUserById(
  userId: string
): Promise<DatabaseUser | null> {
  try {
    const supabase = getSupabaseClient();

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) {
      return null;
    }

    return data;
  } catch (error) {
    return null;
  }
}

/**
 * Get user count from database
 */
export async function getUserCount(): Promise<number> {
  try {
    const supabase = getSupabaseClient();

    const { count, error } = await supabase
      .from("users")
      .select("*", { count: "exact", head: true });

    if (error) {
      return 0;
    }

    return count || 0;
  } catch (error) {
    return 0;
  }
}

/**
 * Delete a user from the database
 */
export async function deleteUser(userId: string): Promise<boolean> {
  try {
    const supabase = getSupabaseClient();

    const { error } = await supabase.from("users").delete().eq("id", userId);

    if (error) {
      return false;
    }

    return true;
  } catch (error) {
    return false;
  }
}
