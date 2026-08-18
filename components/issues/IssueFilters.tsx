"use client";

import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
      className="space-y-4 rounded-lg border p-4"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
        {/* Search */}
        <div className="flex-1 min-w-[200px] space-y-2">
          <Label htmlFor="search" className="text-xs">
            Search
          </Label>
          <Input
            id="search"
            placeholder="Search by title..."
            {...register("search")}
          />
        </div>

        {/* Status */}
        <div className="flex-1 min-w-[150px] space-y-2">
          <Label htmlFor="status" className="text-xs">
            Status
          </Label>
          <select
            id="status"
            {...register("status")}
            className="w-full rounded-md border bg-background px-3 py-2 text-sm"
          >
            <option value="">All statuses</option>
            <option value="OPEN">Open</option>
            <option value="IN_PROGRESS">
              In Progress
            </option>
            <option value="RESOLVED">Resolved</option>
            <option value="CLOSED">Closed</option>
          </select>
        </div>

        {/* Priority */}
        <div className="flex-1 min-w-[150px] space-y-2">
          <Label htmlFor="priority" className="text-xs">
            Priority
          </Label>
          <select
            id="priority"
            {...register("priority")}
            className="w-full rounded-md border bg-background px-3 py-2 text-sm"
          >
            <option value="">All priorities</option>
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
            <option value="URGENT">Urgent</option>
          </select>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-2">
        <Button
          type="submit"
          size="sm"
        >
          Search
        </Button>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleReset}
        >
          Reset
        </Button>
      </div>
    </form>
  );
}