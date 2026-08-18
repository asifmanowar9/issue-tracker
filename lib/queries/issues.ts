import { createClient } from "@/lib/supabase/client";

export type CreateIssueInput = {
  projectId: string;
  title: string;
  description: string;
  status: "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
};

export type IssueFilters = {
  search?: string;
  status?: string;
  priority?: string;
};

export async function getIssues(
  projectId: string,
  filters: IssueFilters = {}
) {
  const supabase = createClient();

  let query = supabase
    .from("issues")
    .select("*")
    .eq("project_id", projectId)
    .order("created_at", {
      ascending: false,
    });

  if (filters.search) {
    query = query.ilike(
      "title",
      `%${filters.search}%`
    );
  }

  if (filters.status) {
    query = query.eq("status", filters.status);
  }

  if (filters.priority) {
    query = query.eq(
      "priority",
      filters.priority
    );
  }

  const { data, error } = await query;

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

export async function getIssue(issueId: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("issues")
    .select("*")
    .eq("id", issueId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export type UpdateIssueInput = {
  id: string;
  title: string;
  description: string;
  status: "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
};

export async function updateIssue({
  id,
  title,
  description,
  status,
  priority,
}: UpdateIssueInput) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("issues")
    .update({
      title,
      description,
      status,
      priority,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function deleteIssue(issueId: string) {
  const supabase = createClient();

  const { error } = await supabase
    .from("issues")
    .delete()
    .eq("id", issueId);

  if (error) {
    throw new Error(error.message);
  }
}
