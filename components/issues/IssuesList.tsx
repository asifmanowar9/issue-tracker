"use client";

import { useQuery } from "@tanstack/react-query";
import { getIssues } from "@/lib/queries/issues";

type IssuesListProps = {
  projectId: string;
};

export default function IssuesList({
  projectId,
}: IssuesListProps) {
  const {
    data: issues,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["issues", projectId],
    queryFn: () => getIssues(projectId),
  });

  if (isLoading) {
    return <p>Loading issues...</p>;
  }

  if (error) {
    return <p>Failed to load issues.</p>;
  }

  if (!issues?.length) {
    return <p>No issues yet.</p>;
  }

  return (
    <div className="space-y-3">
      {issues.map((issue) => (
        <div
          key={issue.id}
          className="rounded-lg border p-4"
        >
          <h3 className="font-semibold">
            {issue.title}
          </h3>

          <p className="text-sm text-muted-foreground">
            {issue.description}
          </p>

          <div className="mt-3 flex gap-2 text-sm">
            <span>
              Status: {issue.status}
            </span>

            <span>
              Priority: {issue.priority}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}