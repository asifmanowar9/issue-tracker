"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { deleteProject } from "@/lib/queries/projects";

import { Button } from "@/components/ui/button";

type DeleteProjectButtonProps = {
  projectId: string;
};

export default function DeleteProjectButton({
  projectId,
}: DeleteProjectButtonProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [showConfirm, setShowConfirm] = useState(false);

  const mutation = useMutation({
    mutationFn: deleteProject,

    onSuccess: () => {
      queryClient.removeQueries({
        queryKey: ["projects", projectId],
      });

      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });

      router.push("/projects");
    },
  });

  function handleDelete() {
    mutation.mutate(projectId);
  }

  if (showConfirm) {
    return (
      <div className="space-y-3 rounded-lg border border-destructive/20 bg-destructive/5 p-4">
        <p className="text-sm font-medium text-destructive">
          Are you sure you want to delete this project? This will also delete all associated issues.
          This action cannot be undone.
        </p>
        <div className="flex gap-2">
          <Button
            variant="destructive"
            size="sm"
            onClick={handleDelete}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Deleting..." : "Delete"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowConfirm(false)}
            disabled={mutation.isPending}
          >
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Button
      variant="destructive"
      onClick={() => setShowConfirm(true)}
      disabled={mutation.isPending}
      type="button"
    >
      Delete Project
    </Button>
  );
}
