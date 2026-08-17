import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Sidebar() {
  return (
    <aside className="flex h-screen w-64 flex-col border-r bg-white">
      <div className="border-b p-6">
        <h1 className="text-xl font-bold">IssueTracker</h1>
      </div>

      <nav className="flex flex-1 flex-col gap-2 p-4">
        <Link
          href="/dashboard"
          className="rounded-md px-3 py-2 text-sm hover:bg-gray-100"
        >
          Dashboard
        </Link>

        <Link
          href="/projects"
          className="rounded-md px-3 py-2 text-sm hover:bg-gray-100"
        >
          Projects
        </Link>

        <Link
          href="/issues"
          className="rounded-md px-3 py-2 text-sm hover:bg-gray-100"
        >
          Issues
        </Link>
      </nav>
    </aside>
  );
}