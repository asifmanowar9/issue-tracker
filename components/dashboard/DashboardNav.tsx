import Link from "next/link";

import LogoutButton from "@/components/auth/LogoutButton";

export default function DashboardNav() {
  return (
    <nav className="border-b">
      <div className="mx-auto flex max-w-7xl items-center gap-6 px-6 py-4">
        <Link
          href="/dashboard"
          className="font-semibold"
        >
          IssueTracker
        </Link>

        <div className="flex gap-4 text-sm">
          <Link href="/dashboard">
            Dashboard
          </Link>

          <Link href="/projects">
            Projects
          </Link>

          <Link href="/issues">
            Issues
          </Link>
        </div>
        <div className="ml-auto">
  <LogoutButton />
</div>
      </div>
    </nav>
  );
}