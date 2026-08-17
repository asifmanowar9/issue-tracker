"use client";

import { useForm } from "react-hook-form";
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { createProject } from "@/lib/queries/projects";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type CreateProjectFormValues = {
  name: string;
  description: string;
};

export default function CreateProjectForm() {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateProjectFormValues>();

  const mutation = useMutation({
    mutationFn: createProject,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });

      reset();
    },
  });

  function onSubmit(data: CreateProjectFormValues) {
    mutation.mutate(data);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-xl space-y-6 rounded-lg border p-6"
    >
      <div>
        <h2 className="text-lg font-semibold">
          Create Project
        </h2>

        <p className="text-sm text-muted-foreground">
          Create a new project to start tracking issues.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">
          Project name
        </Label>

        <Input
          id="name"
          placeholder="IssueTracker"
          {...register("name", {
            required: "Project name is required",
          })}
        />

        {errors.name && (
          <p className="text-sm text-destructive">
            {errors.name.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">
          Description
        </Label>

        <Textarea
          id="description"
          placeholder="Project description..."
          {...register("description")}
        />
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
          : "Create Project"}
      </Button>
    </form>
  );
}