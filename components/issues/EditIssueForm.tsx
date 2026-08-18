"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getIssue,
  updateIssue,
} from "@/lib/queries/issues";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import DeleteIssueButton from "@/components/issues/DeleteIssueButton";

type EditIssueFormValues = {
  title: string;
  description: string;
  status: "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
};

type EditIssueFormProps = {
  projectId: string;
  issueId: string;
};

export default function EditIssueForm({
  projectId,
  issueId,
}: EditIssueFormProps) {
  const queryClient = useQueryClient();

  const {
    data: issue,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["issues", projectId, issueId],
    queryFn: () => getIssue(issueId),
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    watch,
    formState: { 
        errors,
        isDirty,
        isSubmitting,
     },
  } = useForm<EditIssueFormValues>();

  useEffect(() => {
    if (!issue) {
        return;
    }
      reset({
        title: issue.title,
        description: issue.description ?? "",
        status: issue.status,
        priority: issue.priority,
      });
  }, [issue, reset]);

  const mutation = useMutation({
    mutationFn: updateIssue,

    onSuccess: (updatedIssue) => {
      queryClient.setQueryData(
        ["issues", projectId, issueId],
        updatedIssue
      );

      queryClient.invalidateQueries({
        queryKey: ["issues", projectId],
      });
    },
  });

  function onSubmit(data: EditIssueFormValues) {
    mutation.mutate({
      id: issueId,
      ...data,
    });
  }

  if (isLoading) {
    return <p>Loading issue...</p>;
  }

  if (error) {
    return <p>Failed to load issue.</p>;
  }

  if (!issue) {
    return <p>Issue not found.</p>;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 rounded-lg border p-6"
    >
      <div>
        <h1 className="text-xl font-semibold">
          Edit Issue
        </h1>

        <p className="text-sm text-muted-foreground">
          Update the issue information.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="title">
          Title
        </Label>

        <Input
          id="title"
          {...register("title", {
            required: "Issue title is required",
          })}
        />

        {errors.title && (
          <p className="text-sm text-destructive">
            {errors.title.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">
          Description
        </Label>

        <Textarea
          id="description"
          {...register("description")}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">
          Status
        </Label>

        <select
          id="status"
          className="w-full rounded-md border bg-background p-2"
          {...register("status")}
        >
          <option value="OPEN">Open</option>
          <option value="IN_PROGRESS">
            In Progress
          </option>
          <option value="RESOLVED">Resolved</option>
          <option value="CLOSED">Closed</option>
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="priority">
          Priority
        </Label>

        <select
          id="priority"
          className="w-full rounded-md border bg-background p-2"
          {...register("priority")}
        >
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
          <option value="URGENT">Urgent</option>
        </select>
      </div>

      {mutation.isError && (
        <p className="text-sm text-destructive">
          {mutation.error.message}
        </p>
      )}

      {mutation.isSuccess && (
        <p className="text-sm text-green-600">
          Issue updated successfully.
        </p>
      )}

      <Button
        type="submit"
        disabled={mutation.isPending}
      >
        {mutation.isPending
          ? "Saving..."
          : "Save Changes"}
      </Button>
      <DeleteIssueButton
  projectId={projectId}
  issueId={issueId}
/>
    </form>
  );
}