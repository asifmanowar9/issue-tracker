"use client";

import { useQuery } from "@tanstack/react-query";
import { getProject } from "@/lib/queries/projects";

type ProjectDetailsProps = {
  projectId: string;
};

export default function ProjectDetails({
  projectId,
}: ProjectDetailsProps) {
  const {
    data: project,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["projects", projectId],
    queryFn: () => getProject(projectId),
  });

  if (isLoading) {
    return <p>Loading project...</p>;
  }

  if (error) {
    return <p>Failed to load project.</p>;
  }

  if (!project) {
    return <p>Project not found.</p>;
  }

  return (
    <div className="space-y-2">
      <h1 className="text-2xl font-semibold">
        {project.name}
      </h1>

      <p className="text-muted-foreground">
        {project.description || "No description"}
      </p>
    </div>
  );
}