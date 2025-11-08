import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Engage Flow
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-2">
            Generic Whop App Template
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            A production-ready foundation for building Whop apps
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Link
            href="/dashboard/test-company-123"
            className="group block p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg border-2 border-blue-200 dark:border-blue-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all"
          >
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
              👨‍💼
            </div>
            <h2 className="text-2xl font-bold mb-2 text-blue-600 dark:text-blue-400">
              Admin Dashboard
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Creator and admin tools at /dashboard/[companyId]
            </p>
          </Link>

          <Link
            href="/experiences/test-experience-456"
            className="group block p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg border-2 border-purple-200 dark:border-purple-800 hover:border-purple-500 dark:hover:border-purple-500 transition-all"
          >
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
              👥
            </div>
            <h2 className="text-2xl font-bold mb-2 text-purple-600 dark:text-purple-400">
              Member Experience
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              User-facing content at /experiences/[experienceId]
            </p>
          </Link>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 rounded-lg p-8 border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold mb-4">What's Included</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-start gap-2">
              <span className="text-green-600 dark:text-green-400 mt-1">✓</span>
              <div>
                <strong>Whop SDK Integration</strong>
                <p className="text-gray-600 dark:text-gray-400">
                  Authentication and access control ready
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-600 dark:text-green-400 mt-1">✓</span>
              <div>
                <strong>Supabase Setup</strong>
                <p className="text-gray-600 dark:text-gray-400">
                  Database connection configured
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-600 dark:text-green-400 mt-1">✓</span>
              <div>
                <strong>Light & Dark Mode</strong>
                <p className="text-gray-600 dark:text-gray-400">
                  Full theme support with toggle
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-600 dark:text-green-400 mt-1">✓</span>
              <div>
                <strong>Role Switcher</strong>
                <p className="text-gray-600 dark:text-gray-400">
                  Easy testing between admin/member views
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-500">
          <p>Use the role switcher (top right) and theme toggle (bottom right) to test features</p>
        </div>
      </div>
    </div>
  );
}
