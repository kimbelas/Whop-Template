/**
 * Whop API Type Definitions
 * Based on: https://docs.whop.com/api-reference
 */

/**
 * Whop User model from /users/{id} endpoint
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
 */
export type AccessLevel = "no_access" | "admin" | "customer";

/**
 * Check access response from Whop API
 */
export interface CheckAccessResponse {
  /** Whether the user has access to the resource */
  has_access: boolean;
  /** Permission tier from AccessLevel enum */
  access_level: AccessLevel;
}

/**
 * Resource types that can be checked for access
 */
export type WhopResourceType = "company" | "product" | "experience";

/**
 * Whop resource ID formats
 */
export type WhopResourceId =
  | `biz_${string}` // Company
  | `prod_${string}` // Product
  | `exp_${string}`; // Experience

/**
 * Authorized user roles in a company
 * From /authorized_users endpoint
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
 */
export interface AuthorizedUsersResponse {
  /** List of authorized users */
  data: AuthorizedUser[];
  /** Pagination metadata */
  page_info: PageInfo;
}
