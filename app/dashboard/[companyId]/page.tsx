import { getWhopUser, getAllAuthorizedUsers, checkUserAccess } from "@/lib/whop";
import { getAllUsers, syncUserToDatabase } from "@/lib/users";
import { UsersList } from "@/components/UsersList";
import { AuthorizedUsersList } from "@/components/AuthorizedUsersList";
import { Avatar } from "@/components/Avatar";
import { redirect } from "next/navigation";

interface DashboardPageProps {
  params: Promise<{
    companyId: string;
  }>;
}

export default async function DashboardPage({ params }: DashboardPageProps) {
  const { companyId } = await params;
  const user = await getWhopUser();

  // Redirect if not authenticated
  if (!user) {
    redirect("/");
  }

  // Check if user has admin access to this company
  const accessCheck = await checkUserAccess(companyId as `biz_${string}`);
  const isAdmin = accessCheck?.access_level === "admin";

  // Only admins can access the dashboard
  if (!isAdmin) {
    redirect(`/experiences/${companyId}`);
  }

  // Sync current user to database
  await syncUserToDatabase(user);

  // Fetch all users from database
  const allUsers = await getAllUsers();

  // Fetch authorized users from Whop API
  const authorizedUsersResponse = await getAllAuthorizedUsers(companyId);
  const authorizedUsers = authorizedUsersResponse?.data || [];

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
          <h2 className="text-2xl font-semibold mb-4">Welcome, Admin</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <Avatar
                profilePictureUrl={user.profile_picture?.url}
                username={user.username}
                name={user.name}
                size="lg"
              />
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
              ✓ Admin Access Verified
            </p>
          </div>
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


        {/* Authorized Users Section - From Whop API */}
        <div className="mt-8">
          <AuthorizedUsersList users={authorizedUsers} />
        </div>

        {/* All Users Section - From Supabase Database */}
        <div className="mt-8">
          <UsersList users={allUsers} />
        </div>
      </div>
    </div>
  );
}
