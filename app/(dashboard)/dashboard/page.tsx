"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { getProjects } from "@/lib/queries/projects";
import { getIssues } from "@/lib/queries/issues";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const {
    data: projects,
    isLoading: projectsLoading,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });

  const {
    data: allIssues,
    isLoading: issuesLoading,
  } = useQuery({
    queryKey: ["issues"],
    queryFn: async () => {
      if (!projects || projects.length === 0)
        return [];
      const issuesPerProject = await Promise.all(
        projects.map((p) =>
          getIssues(p.id, {}).catch(
            () => []
          )
        )
      );
      return issuesPerProject.flat();
    },
    enabled: !!projects && projects.length > 0,
  });

  const stats = {
    projects: projects?.length || 0,
    issues: allIssues?.length || 0,
    openIssues:
      allIssues?.filter(
        (i) => i.status === "OPEN"
      ).length || 0,
    urgentIssues:
      allIssues?.filter(
        (i) => i.priority === "URGENT"
      ).length || 0,
  };

  const isLoading =
    projectsLoading || issuesLoading;

  return (
    <main className="space-y-8 p-6">
      <div>
        <h1 className="text-3xl font-bold">
          Welcome Back!
        </h1>
        <p className="mt-2 text-muted-foreground">
          Here's a quick overview of your
          projects and issues.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-lg border p-6">
          <div className="text-sm font-medium text-muted-foreground">
            Total Projects
          </div>
          <div className="mt-2 text-3xl font-bold">
            {isLoading ? "-" : stats.projects}
          </div>
        </div>

        <div className="rounded-lg border p-6">
          <div className="text-sm font-medium text-muted-foreground">
            Total Issues
          </div>
          <div className="mt-2 text-3xl font-bold">
            {isLoading ? "-" : stats.issues}
          </div>
        </div>

        <div className="rounded-lg border p-6">
          <div className="text-sm font-medium text-muted-foreground">
            Open Issues
          </div>
          <div className="mt-2 text-3xl font-bold text-orange-600">
            {isLoading ? "-" : stats.openIssues}
          </div>
        </div>

        <div className="rounded-lg border p-6">
          <div className="text-sm font-medium text-muted-foreground">
            Urgent Issues
          </div>
          <div className="mt-2 text-3xl font-bold text-red-600">
            {isLoading ? "-" : stats.urgentIssues}
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid gap-4 md:grid-cols-2">
       <div className="rounded-lg border p-6">
  <div className="mb-4 flex items-center justify-between">
    <h2 className="text-lg font-semibold">
      Recent Projects
    </h2>

    <Button
      onClick={() => {
        window.location.href = "/projects";
      }}
    >
      Create New Project
    </Button>
  </div>
          {!projectsLoading &&
          projects &&
          projects.length > 0 ? (
            <div className="space-y-2">
              {projects.slice(0, 4).map((project) => (
                <Link
                  key={project.id}
                  href={`/projects/${project.id}`}
                  className="block rounded px-3 py-2 text-sm hover:bg-gray-100"
                >
                  {project.name}
                </Link>
              ))}
              {projects.length > 3 && (
                <Link
                  href="/projects"
                  className="text-sm text-blue-600 hover:underline"
                >
                  View all projects →
                </Link>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                No projects yet. Create one to
                get started.
              </p>
              <Link href="/projects">
                <Button size="sm">
                  Create Project
                </Button>
              </Link>
            </div>
          )}
        </div>

        <div className="rounded-lg border p-6">
          <h2 className="mb-4 text-lg font-semibold">
            Recent Issues
          </h2>
          {!issuesLoading && allIssues &&
          allIssues.length > 0 ? (
            <div className="space-y-2">
              {allIssues.slice(0, 3).map(
                (issue) => (
                  <div
                    key={issue.id}
                    className="rounded px-3 py-2 text-sm hover:bg-gray-100"
                  >
                    <p className="font-medium">
                      {issue.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {issue.status}
                    </p>
                  </div>
                )
              )}
              <Link
                href="/issues"
                className="text-sm text-blue-600 hover:underline"
              >
                View all issues →
              </Link>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              No issues yet.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}