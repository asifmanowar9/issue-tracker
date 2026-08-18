import { createClient } from "@/lib/supabase/client";

export async function getProjects() {
  const supabase = createClient();

  const {
    data,
    error,
  } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getProject(projectId: string) {
  const supabase = createClient();

  const {
    data,
    error,
  } = await supabase
    .from("projects")
    .select("*")
    .eq("id", projectId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export type UpdateProjectInput = {
  id: string;
  name: string;
  description: string;
};

export async function updateProject({
  id,
  name,
  description,
}: UpdateProjectInput) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("projects")
    .update({
      name,
      description,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export type CreateProjectInput = {
  name: string;
  description: string;
};

export async function createProject(input: CreateProjectInput) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("You must be logged in");
  }

  const { data, error } = await supabase
    .from("projects")
    .insert({
      name: input.name,
      description: input.description,
      owner_id: user.id,
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function deleteProject(projectId: string) {
  const supabase = createClient();

  const { error } = await supabase
    .from("projects")
    .delete()
    .eq("id", projectId);

  if (error) {
    throw new Error(error.message);
  }
}