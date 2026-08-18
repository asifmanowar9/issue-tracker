"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getProject,
  updateProject,
} from "@/lib/queries/projects";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import DeleteProjectButton from "@/components/projects/DeleteProjectButton";

type EditProjectFormValues = {
  name: string;
  description: string;
};

type EditProjectFormProps = {
  projectId: string;
};

export default function EditProjectForm({
  projectId,
}: EditProjectFormProps) {
  const queryClient = useQueryClient();

  const {
    data: project,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["projects", projectId],
    queryFn: () => getProject(projectId),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditProjectFormValues>();

  useEffect(() => {
    if (project) {
      reset({
        name: project.name,
        description: project.description ?? "",
      });
    }
  }, [project, reset]);

  const mutation = useMutation({
    mutationFn: updateProject,

    onSuccess: (updatedProject) => {
      queryClient.setQueryData(
        ["projects", projectId],
        updatedProject
      );

      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
    },
  });

  function onSubmit(data: EditProjectFormValues) {
    mutation.mutate({
      id: projectId,
      name: data.name,
      description: data.description,
    });
  }

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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-xl space-y-6 rounded-lg border p-6"
    >
      <div>
        <h2 className="text-lg font-semibold">
          Edit Project
        </h2>

        <p className="text-sm text-muted-foreground">
          Update your project information.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">
          Project name
        </Label>

        <Input
          id="name"
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
          {...register("description")}
        />
      </div>

      {mutation.isError && (
        <p className="text-sm text-destructive">
          {mutation.error.message}
        </p>
      )}

      {mutation.isSuccess && (
        <p className="text-sm text-green-600">
          Project updated successfully.
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

      <DeleteProjectButton projectId={projectId} />
    </form>
  );
}