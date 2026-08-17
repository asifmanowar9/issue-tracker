import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">
            Login
          </h1>

          <p className="text-muted-foreground">
            Login to your IssueTracker account.
          </p>
        </div>

        <LoginForm />
      </div>
    </main>
  );
}