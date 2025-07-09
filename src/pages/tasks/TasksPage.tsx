"use server-entry";
import { Suspense } from "react";
import { Layout } from "../../layout/Layout";
import { TaskList } from "./TaskList";
import { TaskListSkeleton } from "./TaskListSkeleton";
import { getTasks } from "./tasks";

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
