import { createClient } from "@/lib/supabase/client";

export type CreateIssueInput = {
  projectId: string;
  title: string;
  description: string;
  status: "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
};

export async function getIssues(projectId: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("issues")
    .select("*")
    .eq("project_id", projectId)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function createIssue({
  projectId,
  title,
  description,
  status,
  priority,
}: CreateIssueInput) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("You must be logged in");
  }

  const { data, error } = await supabase
    .from("issues")
    .insert({
      project_id: projectId,
      title,
      description,
      status,
      priority,
      created_by: user.id,
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}