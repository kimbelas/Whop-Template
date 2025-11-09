"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

type Role = "admin" | "member";

export default function RoleSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const [testIds, setTestIds] = useState({
    companyId: process.env.NEXT_PUBLIC_WHOP_COMPANY_ID || "test-company-123",
    experienceId: "test-experience-456",
  });

  // Only show in development (comment out if you want it in production)
  if (process.env.NODE_ENV === "production") {
    return null;
  }

  // Determine current role based on pathname
  const currentRole: Role = pathname?.startsWith("/dashboard")
    ? "admin"
    : "member";

  const handleRoleSwitch = (role: Role) => {
    if (role === "admin") {
      router.push(`/dashboard/${testIds.companyId}`);
    } else {
      router.push(`/experiences/${testIds.experienceId}`);
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4">
      <div className="mb-3">
        <label className="block text-sm font-medium mb-1">Test Role</label>
        <div className="flex gap-2">
          <button
            onClick={() => handleRoleSwitch("admin")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              currentRole === "admin"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            Admin
          </button>
          <button
            onClick={() => handleRoleSwitch("member")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              currentRole === "member"
                ? "bg-purple-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            Member
          </button>
        </div>
      </div>

      <div className="text-xs text-gray-600 dark:text-gray-400">
        <div className="mb-2">
          <label className="block font-medium mb-1">Company ID:</label>
          <input
            type="text"
            value={testIds.companyId}
            onChange={(e) =>
              setTestIds({ ...testIds, companyId: e.target.value })
            }
            className="w-full px-2 py-1 text-xs border rounded dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Experience ID:</label>
          <input
            type="text"
            value={testIds.experienceId}
            onChange={(e) =>
              setTestIds({ ...testIds, experienceId: e.target.value })
            }
            className="w-full px-2 py-1 text-xs border rounded dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
      </div>
    </div>
  );
}
