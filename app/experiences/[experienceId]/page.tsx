import { getWhopUser } from "@/lib/whop";
import { syncUserToDatabase } from "@/lib/users";
import { Avatar } from "@/components/Avatar";
import { redirect } from "next/navigation";

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

  // Redirect if not authenticated
  if (!user) {
    redirect("/");
  }

  // Sync current user to database
  await syncUserToDatabase(user);

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
            <p className="text-green-600 dark:text-green-400">
              ✓ Authenticated with Whop
            </p>
          </div>
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

      </div>
    </div>
  );
}
