"use client";

import { useForm } from "react-hook-form";
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { createIssue } from "@/lib/queries/issues";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

type CreateIssueFormValues = {
  title: string;
  description: string;
  status: "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
};

type CreateIssueFormProps = {
  projectId: string;
};

export default function CreateIssueForm({
  projectId,
}: CreateIssueFormProps) {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateIssueFormValues>({
    defaultValues: {
      status: "OPEN",
      priority: "MEDIUM",
    },
  });

  const mutation = useMutation({
    mutationFn: createIssue,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["issues", projectId],
      });

      reset();
    },
  });

  function onSubmit(data: CreateIssueFormValues) {
    mutation.mutate({
      projectId,
      ...data,
    });
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-xl space-y-6 rounded-lg border p-6"
    >
      <div>
        <h2 className="text-lg font-semibold">
          Create Issue
        </h2>

        <p className="text-sm text-muted-foreground">
          Report a new issue for this project.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="title">
          Title
        </Label>

        <Input
          id="title"
          placeholder="Fix login redirect"
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
          placeholder="Describe the issue..."
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
          <option value="IN_PROGRESS">In Progress</option>
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

      <Button
        type="submit"
        disabled={mutation.isPending}
      >
        {mutation.isPending
          ? "Creating..."
          : "Create Issue"}
      </Button>
    </form>
  );
}