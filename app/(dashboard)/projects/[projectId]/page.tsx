import ProjectDetails from "@/components/projects/ProjectDetails";
import EditProjectForm from "@/components/projects/EditProjectForm";
import CreateIssueForm from "@/components/issues/CreateIssueForm";
import IssuesList from "@/components/issues/IssuesList";

type ProjectPageProps = {
  params: Promise<{
    projectId: string;
  }>;
};

export default async function ProjectPage({
  params,
}: ProjectPageProps) {
  const { projectId } = await params;

  return (
    <main className="mx-auto max-w-7xl space-y-8 p-6">
      <ProjectDetails projectId={projectId} />

      <EditProjectForm projectId={projectId} />

      <CreateIssueForm projectId={projectId} />

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">
          Issues
        </h2>

        <IssuesList projectId={projectId} />
      </section>
    </main>
  );
}