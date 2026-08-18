"use client";

import { useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

import {
  getIssues,
  IssueFilters,
} from "@/lib/queries/issues";

import IssueFiltersForm, {
  IssueFilterValues,
} from "./IssueFilters";

type IssuesListProps = {
  projectId: string;
};

export default function IssuesList({
  projectId,
}: IssuesListProps) {
  const [filters, setFilters] =
    useState<IssueFilterValues>({
      search: "",
      status: "",
      priority: "",
    });

  const {
    data: issues,
    isLoading,
    isFetching,
    error,
  } = useQuery({
    queryKey: [
      "issues",
      projectId,
      filters,
    ],

    queryFn: () =>
      getIssues(projectId, filters),
  });

  if (error) {
    return (
      <p className="text-sm text-destructive">
        Failed to load issues.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      <IssueFiltersForm
        onFilterChange={setFilters}
      />

      {isLoading && (
        <p>Loading issues...</p>
      )}

      {isFetching && !isLoading && (
        <p className="text-sm text-muted-foreground">
          Updating results...
        </p>
      )}

      {!isLoading && !issues?.length && (
        <p>No matching issues found.</p>
      )}

      <div className="space-y-3">
        {issues?.map((issue) => (
          <Link
            key={issue.id}
            href={`/projects/${projectId}/issues/${issue.id}`}
            className="block rounded-lg border p-4 transition hover:bg-muted"
          >
            <h3 className="font-semibold">
              {issue.title}
            </h3>

            <p className="text-sm text-muted-foreground">
              {issue.description}
            </p>

            <div className="mt-3 flex gap-3 text-sm">
              <span>
                Status: {issue.status}
              </span>

              <span>
                Priority: {issue.priority}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}