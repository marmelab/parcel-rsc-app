"use client";
import { useOptimistic, useTransition } from "react";
import { v7 as generateUuid } from "uuid";
import type { Task } from "../../types";
import { ClearCompletedTasksButton } from "./ClearCompletedTasksButton";
import { CompleteAllTasksButton } from "./CompleteAllTasksButton";
import { NewTask } from "./NewTask";
import { TaskFilters } from "./TaskFilters";
import { TaskItem } from "./TaskItem";
import { addTask } from "./tasks";

export const TaskList = ({
	filter,
	tasks,
	totalActiveTasks,
}: {
	filter?: "active" | "completed";
	tasks: Task[];
	totalActiveTasks: number;
}) => {
	const [, startTransitionNewTask] = useTransition();

	const [optimisticData, setOptimisticTask] = useOptimistic<
		{ tasks: Task[]; totalActiveTasks: number },
		Task
	>({ tasks, totalActiveTasks }, ({ tasks, totalActiveTasks }, newTask) => {
		return {
			tasks: [newTask, ...tasks],
			totalActiveTasks: totalActiveTasks + 1,
		};
	});

	const handleAddTask = (formData: FormData) => {
		startTransitionNewTask(async () => {
			// We might want to use zod or something here to validate the new task
			setOptimisticTask(getTaskFromFormData(formData));
			await addTask(formData);
		});
	};

	return (
		<>
			<NewTask onAddTask={handleAddTask} />

			{optimisticData.tasks.length === 0 ? (
				<div className="alert">
					<div>
						<span>No tasks</span>
					</div>
				</div>
			) : (
				<ul className="list bg-base-300 rounded-box shadow-md">
					{optimisticData.tasks.map((task) => (
						<TaskItem
							key={task.id}
							task={task}
							isOptimistic={!tasks.some((t) => t.id === task.id)}
						/>
					))}
				</ul>
			)}
			<div className="flex flex-col gap-6">
				<div className="flex justify-between items-center">
					<div className="text-sm opacity-80">
						{optimisticData.totalActiveTasks}{" "}
						{`task${optimisticData.totalActiveTasks === 1 ? "" : "s"}`} left
					</div>
					<div className="flex gap-6">
						<CompleteAllTasksButton />
						<ClearCompletedTasksButton />
					</div>
				</div>
				<TaskFilters filter={filter} />
			</div>
		</>
	);
};

const getTaskFromFormData = (formData: FormData): Task => {
	const now = new Date();
	const newTask: Task = {
		id: generateUuid(), // Temporary ID, should be replaced by the server
		description: formData.get("description")?.toString() || "",
		completed_at: null,
		created_at: now.toISOString(),
		update_at: now.toISOString(),
	};

	return newTask;
};
