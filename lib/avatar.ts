/**
 * Avatar utility functions
 * Generates consistent avatars for users using DiceBear API
 */

export type AvatarStyle =
  | "adventurer"
  | "avataaars"
  | "bottts"
  | "personas"
  | "pixel-art";

/**
 * Generate avatar URL using DiceBear API
 * @param seed - Unique identifier (username, email, or ID)
 * @param style - Avatar style (default: adventurer)
 * @returns Avatar image URL
 */
export function generateAvatarUrl(
  seed: string,
  style: AvatarStyle = "adventurer"
): string {
  return `https://api.dicebear.com/7.x/${style}/svg?seed=${encodeURIComponent(seed)}`;
}

/**
 * Get avatar URL for a user
 * Prioritizes profile picture, falls back to generated avatar
 */
export function getUserAvatarUrl(
  profilePictureUrl: string | null | undefined,
  username: string,
  style: AvatarStyle = "adventurer"
): string {
  if (profilePictureUrl) {
    return profilePictureUrl;
  }
  return generateAvatarUrl(username, style);
}

/**
 * Get initials from name or username
 * Used as fallback when avatar images fail to load
 */
export function getInitials(name: string | null, username: string): string {
  if (name) {
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    }
    return name.charAt(0).toUpperCase();
  }
  return username.charAt(0).toUpperCase();
}
