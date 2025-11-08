/**
 * 🔒 CORE COMPONENT - DO NOT DELETE
 *
 * Reusable avatar component with automatic fallbacks:
 * Profile picture → Generated avatar → Initials
 *
 * This is a core UI component used throughout the app.
 */

"use client";

import { useState } from "react";
import { getUserAvatarUrl, getInitials } from "@/lib/avatar";

interface AvatarProps {
  profilePictureUrl?: string | null;
  username: string;
  name?: string | null;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "w-8 h-8 text-sm",
  md: "w-10 h-10 text-base",
  lg: "w-16 h-16 text-2xl",
};

export function Avatar({
  profilePictureUrl,
  username,
  name,
  size = "md",
  className = "",
}: AvatarProps) {
  const [imageError, setImageError] = useState(false);
  const avatarUrl = getUserAvatarUrl(profilePictureUrl, username);
  const initials = getInitials(name, username);

  if (imageError || !avatarUrl) {
    return (
      <div
        className={`${sizeClasses[size]} ${className} rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold`}
      >
        {initials}
      </div>
    );
  }

  return (
    <img
      src={avatarUrl}
      alt={name || username}
      className={`${sizeClasses[size]} ${className} rounded-full bg-gray-200 dark:bg-gray-700`}
      onError={() => setImageError(true)}
    />
  );
}
