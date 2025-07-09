"use server-entry";
import { Layout } from "../../layout/Layout";
import { TaskList } from "./TaskList";
import { getTasks } from "./tasks";

export async function TasksPage({
  filter,
}: {
  filter?: "active" | "completed" | undefined;
}) {
  const { tasks, totalActiveTasks } = await getTasks(filter);

  return (
    <Layout>
      <TaskList
        filter={filter}
        tasks={tasks}
        totalActiveTasks={totalActiveTasks}
      />
    </Layout>
  );
}
