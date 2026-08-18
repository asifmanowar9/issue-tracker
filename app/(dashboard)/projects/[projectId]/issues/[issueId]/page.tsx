import EditIssueForm from "@/components/issues/EditIssueForm";

type IssuePageProps = {
  params: Promise<{
    projectId: string;
    issueId: string;
  }>;
};

export default async function IssuePage({
  params,
}: IssuePageProps) {
  const { projectId, issueId } = await params;

  return (
    <main className="mx-auto max-w-4xl p-6">
      <EditIssueForm
        projectId={projectId}
        issueId={issueId}
      />
    </main>
  );
}