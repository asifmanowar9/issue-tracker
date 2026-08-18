"use client";

import { useForm } from "react-hook-form";

export type IssueFilterValues = {
  search: string;
  status: string;
  priority: string;
};

type IssueFiltersProps = {
  onFilterChange: (
    filters: IssueFilterValues
  ) => void;
};

export default function IssueFilters({
  onFilterChange,
}: IssueFiltersProps) {
  const { register, handleSubmit, reset } =
    useForm<IssueFilterValues>({
      defaultValues: {
        search: "",
        status: "",
        priority: "",
      },
    });

  function onSubmit(data: IssueFilterValues) {
    onFilterChange(data);
  }

  function handleReset() {
    reset();

    onFilterChange({
      search: "",
      status: "",
      priority: "",
    });
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-wrap gap-3 rounded-lg border p-4"
    >
      <input
        placeholder="Search issues..."
        {...register("search")}
        className="rounded-md border bg-background px-3 py-2"
      />

      <select
        {...register("status")}
        className="rounded-md border bg-background px-3 py-2"
      >
        <option value="">All statuses</option>
        <option value="OPEN">Open</option>
        <option value="IN_PROGRESS">
          In Progress
        </option>
        <option value="RESOLVED">Resolved</option>
        <option value="CLOSED">Closed</option>
      </select>

      <select
        {...register("priority")}
        className="rounded-md border bg-background px-3 py-2"
      >
        <option value="">All priorities</option>
        <option value="LOW">Low</option>
        <option value="MEDIUM">Medium</option>
        <option value="HIGH">High</option>
        <option value="URGENT">Urgent</option>
      </select>

      <button
        type="submit"
        className="rounded-md border px-4 py-2"
      >
        Search
      </button>

      <button
        type="button"
        onClick={handleReset}
        className="rounded-md border px-4 py-2"
      >
        Reset
      </button>
    </form>
  );
}