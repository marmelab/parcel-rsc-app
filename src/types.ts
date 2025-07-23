import type { Database } from "./db/supabase.types";

export type Task = Database["public"]["Tables"]["tasks"]["Row"] & {
  isOptimistic?: boolean; // Optional property to indicate optimistic updates
};

export type ActionAddTask = {
  type: "add";
  payload: Task;
};

export type ActionUpdateTask = {
  type: "update";
  payload: Task;
};

export type ActionRollback = {
  type: "rollback";
};

export type Action = ActionAddTask | ActionUpdateTask | ActionRollback;
