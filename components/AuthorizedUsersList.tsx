import type { AuthorizedUser, AuthorizedUserRole } from "@/types/whop";

interface AuthorizedUsersListProps {
  users: AuthorizedUser[];
}

// Role badge color mapping
const roleColors: Record<
  AuthorizedUserRole,
  { bg: string; text: string; border: string }
> = {
  owner: {
    bg: "bg-purple-100 dark:bg-purple-900/30",
    text: "text-purple-800 dark:text-purple-200",
    border: "border-purple-300 dark:border-purple-700",
  },
  admin: {
    bg: "bg-red-100 dark:bg-red-900/30",
    text: "text-red-800 dark:text-red-200",
    border: "border-red-300 dark:border-red-700",
  },
  sales_manager: {
    bg: "bg-green-100 dark:bg-green-900/30",
    text: "text-green-800 dark:text-green-200",
    border: "border-green-300 dark:border-green-700",
  },
  moderator: {
    bg: "bg-blue-100 dark:bg-blue-900/30",
    text: "text-blue-800 dark:text-blue-200",
    border: "border-blue-300 dark:border-blue-700",
  },
  app_manager: {
    bg: "bg-yellow-100 dark:bg-yellow-900/30",
    text: "text-yellow-800 dark:text-yellow-200",
    border: "border-yellow-300 dark:border-yellow-700",
  },
  support: {
    bg: "bg-cyan-100 dark:bg-cyan-900/30",
    text: "text-cyan-800 dark:text-cyan-200",
    border: "border-cyan-300 dark:border-cyan-700",
  },
  manager: {
    bg: "bg-indigo-100 dark:bg-indigo-900/30",
    text: "text-indigo-800 dark:text-indigo-200",
    border: "border-indigo-300 dark:border-indigo-700",
  },
};

function RoleBadge({ role }: { role: AuthorizedUserRole }) {
  const colors = roleColors[role];

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${colors.bg} ${colors.text} ${colors.border}`}
    >
      {role.replace("_", " ").toUpperCase()}
    </span>
  );
}

export function AuthorizedUsersList({ users }: AuthorizedUsersListProps) {
  if (users.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
        <p className="text-gray-500 dark:text-gray-400">
          No authorized users found.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          Authorized Users ({users.length})
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          All users with access to this company
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                User ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Auth ID
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {users.map((authUser) => (
              <tr
                key={authUser.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                      {authUser.user.username.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {authUser.user.name || authUser.user.username}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        @{authUser.user.username}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-700 dark:text-gray-300">
                    {authUser.user.email}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <RoleBadge role={authUser.role} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-mono text-gray-600 dark:text-gray-400">
                    {authUser.user.id}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-mono text-gray-600 dark:text-gray-400">
                    {authUser.id}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Data Preview Section - Shows all raw data for testing */}
      <details className="border-t border-gray-200 dark:border-gray-700">
        <summary className="px-6 py-4 cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
          View Raw JSON Data (for testing)
        </summary>
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900">
          <pre className="text-xs overflow-auto max-h-96 p-4 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
            {JSON.stringify(users, null, 2)}
          </pre>
        </div>
      </details>
    </div>
  );
}
