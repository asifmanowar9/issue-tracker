export default function Navbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6">
      <h2 className="text-lg font-semibold">IssueTracker</h2>

      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-600">User</span>

        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200">
          U
        </div>
      </div>
    </header>
  );
}