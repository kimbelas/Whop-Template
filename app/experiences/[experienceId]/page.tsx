import { getWhopUser } from "@/lib/whop";

interface ExperiencePageProps {
  params: Promise<{
    experienceId: string;
  }>;
}

export default async function ExperiencePage({
  params,
}: ExperiencePageProps) {
  const { experienceId } = await params;
  const user = await getWhopUser();

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Member Experience</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Experience ID: {experienceId}
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-2">Your Content</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Access your exclusive content here
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-2">Community</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Connect with other members
            </p>
          </div>
        </div>

        <div className="mt-8 p-6 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
          <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-2">
            Member View Active
          </h3>
          <p className="text-purple-800 dark:text-purple-200">
            This is your member experience view. Add your custom member features
            here.
          </p>
        </div>
      </div>
    </div>
  );
}
