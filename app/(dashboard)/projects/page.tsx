import ProjectsList from "@/components/projects/ProjectsList";
import CreateProjectForm from "@/components/projects/CreateProjectForm";

export default function ProjectsPage() {
  return (
    <main className="mx-auto max-w-7xl space-y-8 p-6">
      <div>
        <h1 className="text-2xl font-semibold">
          Projects
        </h1>

        <p className="text-muted-foreground">
          Manage your projects.
        </p>
      </div>

      <CreateProjectForm />

      <ProjectsList />
    </main>
  );
}