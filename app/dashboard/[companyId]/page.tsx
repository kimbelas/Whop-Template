import { getWhopUser } from "@/lib/whop";
import { getAllUsers, syncUserToDatabase } from "@/lib/users";
import { UsersList } from "@/components/UsersList";

interface DashboardPageProps {
  params: Promise<{
    companyId: string;
  }>;
}

export default async function DashboardPage({ params }: DashboardPageProps) {
  const { companyId } = await params;
  const user = await getWhopUser();

  // Sync current user to database
  if (user) {
    await syncUserToDatabase(user);
  }

  // Fetch all users from database
  const allUsers = await getAllUsers();

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Company ID: {companyId}
          </p>
        </header>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Welcome</h2>
          {user ? (
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                {user.profile_picture?.url && (
                  <img
                    src={user.profile_picture.url}
                    alt={user.username}
                    className="w-16 h-16 rounded-full"
                  />
                )}
                <div>
                  <p className="text-xl font-bold text-gray-900 dark:text-gray-100">
                    {user.name || user.username}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    @{user.username}
                  </p>
                </div>
              </div>
              {user.bio && (
                <p className="text-gray-700 dark:text-gray-300 italic">
                  "{user.bio}"
                </p>
              )}
              <div className="space-y-1 text-sm">
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-medium">User ID:</span> {user.id}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-medium">Joined:</span>{" "}
                  {new Date(user.created_at).toLocaleDateString()}
                </p>
              </div>
              <p className="text-green-600 dark:text-green-400">
                ✓ Authenticated with Whop
              </p>
            </div>
          ) : (
            <p className="text-amber-600 dark:text-amber-400">
              No user authenticated (Dev proxy required)
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-2">Analytics</h3>
            <p className="text-gray-600 dark:text-gray-400">
              View your analytics and metrics
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-2">Content</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your content and resources
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-2">Settings</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Configure your app settings
            </p>
          </div>
        </div>

        <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
            Ready to Build
          </h3>
          <p className="text-blue-800 dark:text-blue-200">
            This is your admin dashboard view. Add your custom features and
            functionality here.
          </p>
        </div>

        {/* All Users Section */}
        <div className="mt-8">
          <UsersList users={allUsers} />
        </div>
      </div>
    </div>
  );
}
