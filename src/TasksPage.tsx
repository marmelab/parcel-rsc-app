"use server-entry";
import { Suspense } from "react";
import { getTasks } from "./tasks/tasks";
import { TaskList } from "./tasks/TaskList";
import { TaskListSkeleton } from "./tasks/TaskListSkeleton";
import { Layout } from "./layout/Layout";

export async function TasksPage({
  filter,
}: {
  filter?: "active" | "completed" | undefined;
}) {
  const { tasks, totalActiveTasks } = await getTasks(filter);

  return (
    <Layout>
      <Suspense fallback={<TaskListSkeleton />}>
        <TaskList
          filter={filter}
          tasks={tasks}
          totalActiveTasks={totalActiveTasks}
        />
      </Suspense>
    </Layout>
  );
}
