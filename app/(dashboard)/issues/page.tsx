"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { getProjects } from "@/lib/queries/projects";
import { getIssues } from "@/lib/queries/issues";

export default function IssuesPage() {
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
    queryKey: ["allIssues"],
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

  const isLoading =
    projectsLoading || issuesLoading;

  return (
    <main className="mx-auto max-w-7xl space-y-8 p-6">
      <div>
        <h1 className="text-3xl font-bold">
          All Issues
        </h1>
        <p className="mt-2 text-muted-foreground">
          Browse all issues across all your
          projects.
        </p>
      </div>

      {isLoading && (
        <p>Loading issues...</p>
      )}

      {!isLoading && (!allIssues ||
      allIssues.length === 0) && (
        <p className="text-muted-foreground">
          No issues found. Create a project
          and start tracking issues.
        </p>
      )}

      {!isLoading && allIssues &&
      allIssues.length > 0 && (
        <div className="space-y-3">
          {allIssues.map((issue) => {
            const project = projects?.find(
              (p) => p.id === issue.project_id
            );
            return (
              <Link
                key={issue.id}
                href={`/projects/${issue.project_id}/issues/${issue.id}`}
                className="block rounded-lg border p-4 transition hover:bg-muted"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold">
                      {issue.title}
                    </h3>

                    <p className="text-sm text-muted-foreground">
                      {issue.description}
                    </p>

                    {project && (
                      <p className="mt-2 text-xs text-muted-foreground">
                        Project: {project.name}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-3 flex gap-3 text-sm">
                  <span className="rounded-full bg-blue-100 px-2 py-1 text-blue-700">
                    {issue.status}
                  </span>

                  <span className={`rounded-full px-2 py-1 text-white ${
                    issue.priority === "URGENT"
                      ? "bg-red-600"
                      : issue.priority === "HIGH"
                        ? "bg-orange-600"
                        : issue.priority === "MEDIUM"
                          ? "bg-yellow-600"
                          : "bg-green-600"
                  }`}>
                    {issue.priority}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </main>
  );
}
