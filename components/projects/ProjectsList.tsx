"use client";

import { useQuery } from "@tanstack/react-query";
import { getProjects } from "@/lib/queries/projects";
import Link  from "next/link";

export default function ProjectsList() {
  const {
    data,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });

  if (isLoading) {
    return <p>Loading projects...</p>;
  }

  if (error) {
    return <p>Failed to load projects.</p>;
  }

  return (
    <div>
     {data?.map((project) => (
  <Link
    key={project.id}
    href={`/projects/${project.id}`}
    className="block rounded-lg border p-4 hover:bg-muted"
  >
    <h2 className="font-medium">
      {project.name}
    </h2>

    <p className="text-sm text-muted-foreground">
      {project.description || "No description"}
    </p>
  </Link>
))}
    </div>
  );
}