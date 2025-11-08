/**
 * Whop API Type Definitions
 * Based on: https://docs.whop.com/api-reference
 */

// ============================================================================
// 🔒 CORE TYPES - DO NOT REMOVE
// These types are required for Whop authentication and access control
// ============================================================================

/**
 * Whop User model from /users/{id} endpoint
 *
 * 🔒 CORE - Required for authentication
 */
export interface WhopUser {
  /** User identifier (format: user_xxx) */
  id: string;
  /** User's Whop account username */
  username: string;
  /** User's account name */
  name: string | null;
  /** Account creation timestamp */
  created_at: string;
  /** User biography */
  bio: string | null;
  /** Profile picture data */
  profile_picture: {
    /** URL for optimized image rendering */
    url: string;
  } | null;
}

/**
 * Access levels for Whop resources
 * From /users/{id}/access/{resource_id} endpoint
 *
 * 🔒 CORE - Required for access control
 */
export type AccessLevel = "no_access" | "admin" | "customer";

/**
 * Check access response from Whop API
 *
 * 🔒 CORE - Required for access control
 */
export interface CheckAccessResponse {
  /** Whether the user has access to the resource */
  has_access: boolean;
  /** Permission tier from AccessLevel enum */
  access_level: AccessLevel;
}

/**
 * Resource types that can be checked for access
 *
 * 🔒 CORE - Required for access control
 */
export type WhopResourceType = "company" | "product" | "experience";

/**
 * Whop resource ID formats
 *
 * 🔒 CORE - Required for access control
 */
export type WhopResourceId =
  | `biz_${string}` // Company
  | `prod_${string}` // Product
  | `exp_${string}`; // Experience

// ============================================================================
// 📝 EXAMPLE TYPES - SAFE TO REMOVE
// These types are for the authorized users example feature
// Remove them if you delete the AuthorizedUsersList component
// ============================================================================

/**
 * Authorized user roles in a company
 * From /authorized_users endpoint
 *
 * 📝 EXAMPLE - Safe to remove if not using authorized users feature
 */
export type AuthorizedUserRole =
  | "owner"
  | "admin"
  | "sales_manager"
  | "moderator"
  | "app_manager"
  | "support"
  | "manager";

/**
 * User details in authorized users list
 *
 * 📝 EXAMPLE - Safe to remove if not using authorized users feature
 */
export interface AuthorizedUserDetails {
  /** Internal user ID */
  id: string;
  /** User's full name */
  name: string | null;
  /** Whop account username */
  username: string;
  /** User's email address */
  email: string;
}

/**
 * Authorized user object from /authorized_users endpoint
 *
 * 📝 EXAMPLE - Safe to remove if not using authorized users feature
 */
export interface AuthorizedUser {
  /** Authorized user identifier */
  id: string;
  /** User's role within the company */
  role: AuthorizedUserRole;
  /** Nested user details */
  user: AuthorizedUserDetails;
}

/**
 * Page info for pagination
 *
 * 📝 EXAMPLE - Safe to remove if not using authorized users feature
 */
export interface PageInfo {
  /** Cursor for next page */
  end_cursor: string | null;
  /** Cursor for previous page */
  start_cursor: string | null;
  /** Whether there are more results after */
  has_next_page: boolean;
  /** Whether there are more results before */
  has_previous_page: boolean;
}

/**
 * Response from /authorized_users endpoint
 *
 * 📝 EXAMPLE - Safe to remove if not using authorized users feature
 */
export interface AuthorizedUsersResponse {
  /** List of authorized users */
  data: AuthorizedUser[];
  /** Pagination metadata */
  page_info: PageInfo;
}
