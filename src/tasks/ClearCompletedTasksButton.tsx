"use client";
import { useTransition } from "react";
import { clearCompleted } from "./tasks";

export const ClearCompletedTasksButton = () => {
  const [isPending, startTransition] = useTransition();
  return (
    <form action={() => startTransition(() => clearCompleted())}>
      <button
        type="submit"
        className="group btn btn-sm"
        disabled={isPending}
        data-loading={isPending ? "true" : undefined}
      >
        <span className="hidden group-data-loading:block group-data-loading:loading group-data-loading:loading-spinner group-data-loading:loading-xs" />
        Clear completed
      </button>
    </form>
  );
};
