"use client";

import { useRouter } from "next/navigation";
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { deleteIssue } from "@/lib/queries/issues";

import { Button } from "@/components/ui/button";

type DeleteIssueButtonProps = {
  projectId: string;
  issueId: string;
};

export default function DeleteIssueButton({
  projectId,
  issueId,
}: DeleteIssueButtonProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteIssue,

    onSuccess: () => {
      queryClient.removeQueries({
        queryKey: ["issues", projectId, issueId],
      });

      queryClient.invalidateQueries({
        queryKey: ["issues", projectId],
      });

      router.push(`/projects/${projectId}`);
    },
  });

  function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this issue?"
    );

    if (!confirmed) {
      return;
    }

    mutation.mutate(issueId);
  }

  return (
    <div className="space-y-2">
      <Button
        type="button"
        variant="destructive"
        onClick={handleDelete}
        disabled={mutation.isPending}
      >
        {mutation.isPending
          ? "Deleting..."
          : "Delete Issue"}
      </Button>

      {mutation.isError && (
        <p className="text-sm text-destructive">
          {mutation.error.message}
        </p>
      )}
    </div>
  );
}