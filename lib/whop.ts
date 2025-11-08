import { validateToken } from "@whop-apps/sdk";
import { headers } from "next/headers";
import type {
  WhopUser,
  CheckAccessResponse,
  WhopResourceId,
  AccessLevel,
} from "@/types/whop";

/**
 * Whop SDK Configuration
 * Initialize with environment variables from .env.local
 */
export const whopConfig = {
  apiKey: process.env.WHOP_API_KEY || "",
  appId: process.env.NEXT_PUBLIC_WHOP_APP_ID || "",
  agentUserId: process.env.NEXT_PUBLIC_WHOP_AGENT_USER_ID || "",
  companyId: process.env.NEXT_PUBLIC_WHOP_COMPANY_ID || "",
  baseUrl: "https://api.whop.com/api/v1",
};

/**
 * Validate user token from Whop and get user ID
 * This should be called in server components or API routes
 */
export async function getWhopUserId() {
  try {
    const headersList = await headers();
    const { userId } = await validateToken({ headers: headersList });

    if (!userId) {
      return null;
    }

    return userId;
  } catch (error) {
    console.error("Error validating Whop token:", error);
    return null;
  }
}

/**
 * Fetch full user details from Whop API
 * GET /users/{id}
 */
export async function getWhopUser(userId?: string): Promise<WhopUser | null> {
  try {
    const id = userId || (await getWhopUserId());
    if (!id) return null;

    const response = await fetch(`${whopConfig.baseUrl}/users/${id}`, {
      headers: {
        Authorization: `Bearer ${whopConfig.apiKey}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("Failed to fetch user:", response.statusText);
      return null;
    }

    const user: WhopUser = await response.json();
    return user;
  } catch (error) {
    console.error("Error fetching Whop user:", error);
    return null;
  }
}

/**
 * Check if user has access to a specific resource (company, product, or experience)
 * GET /users/{id}/access/{resource_id}
 */
export async function checkUserAccess(
  resourceId: WhopResourceId,
  userId?: string
): Promise<CheckAccessResponse | null> {
  try {
    const id = userId || (await getWhopUserId());
    if (!id) {
      return { has_access: false, access_level: "no_access" };
    }

    const response = await fetch(
      `${whopConfig.baseUrl}/users/${id}/access/${resourceId}`,
      {
        headers: {
          Authorization: `Bearer ${whopConfig.apiKey}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      console.error("Failed to check access:", response.statusText);
      return { has_access: false, access_level: "no_access" };
    }

    const accessData: CheckAccessResponse = await response.json();
    return accessData;
  } catch (error) {
    console.error("Error checking Whop access:", error);
    return { has_access: false, access_level: "no_access" };
  }
}

/**
 * Check if user is admin of a resource
 */
export async function isUserAdmin(
  resourceId: WhopResourceId,
  userId?: string
): Promise<boolean> {
  const access = await checkUserAccess(resourceId, userId);
  return access?.access_level === "admin";
}

/**
 * Check if user is customer of a resource
 */
export async function isUserCustomer(
  resourceId: WhopResourceId,
  userId?: string
): Promise<boolean> {
  const access = await checkUserAccess(resourceId, userId);
  return access?.access_level === "customer";
}

/**
 * Helper to get current user or throw if not authenticated
 */
export async function requireWhopUser(): Promise<WhopUser> {
  const user = await getWhopUser();

  if (!user) {
    throw new Error("Authentication required");
  }

  return user;
}

/**
 * Helper to require admin access to a resource
 */
export async function requireAdmin(
  resourceId: WhopResourceId,
  userId?: string
): Promise<void> {
  const isAdmin = await isUserAdmin(resourceId, userId);

  if (!isAdmin) {
    throw new Error("Admin access required");
  }
}
