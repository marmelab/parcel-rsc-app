"use client";
import { useOptimistic, useState, useTransition } from "react";
import { v7 as generateUuid } from "uuid";
import type { Action, Task } from "../../types";
import { ClearCompletedTasksButton } from "./ClearCompletedTasksButton";
import { CompleteAllTasksButton } from "./CompleteAllTasksButton";
import { NewTask } from "./NewTask";
import { TaskFilters } from "./TaskFilters";
import { TaskItem } from "./TaskItem";
import { addTask, updateTask } from "./tasks";

export const TaskList = ({
  filter,
  tasks,
  totalActiveTasks,
}: {
  filter?: "active" | "completed";
  tasks: Task[];
  totalActiveTasks: number;
}) => {
  const [, startTransition] = useTransition();
  const [error, setError] = useState<Error | null>(null);

  const initialOptimisticData = { tasks, totalActiveTasks };
  const [optimisticData, setOptimisticTasks] = useOptimistic<
    { tasks: Task[]; totalActiveTasks: number },
    Action
  >(initialOptimisticData, (currentOptimisticDataValue, action) => {
    if (action.type === "add") {
      return {
        tasks: [
          { ...action.payload, isOptimistic: true },
          ...currentOptimisticDataValue.tasks,
        ],
        totalActiveTasks: currentOptimisticDataValue.totalActiveTasks + 1,
      };
    }
    if (action.type === "update") {
      const updatedTasks = currentOptimisticDataValue.tasks.map((task) =>
        task.id === action.payload.id
          ? { ...action.payload, isOptimistic: true }
          : task
      );
      return {
        tasks: updatedTasks,
        totalActiveTasks: currentOptimisticDataValue.totalActiveTasks,
      };
    }
    return initialOptimisticData;
  });

  const handleAddTask = async (formData: FormData) => {
    setError(null);
    const now = new Date();

    setOptimisticTasks({
      type: "add",
      payload: {
        id: generateUuid(), // Temporary ID, should be replaced by the server
        description: formData.get("description")?.toString() || "",
        completed_at: null,
        created_at: now.toISOString(),
        updated_at: now.toISOString(),
      },
    });
    startTransition(async () => {
      await addTask(formData).catch((error) => {
        setError(error);
        setOptimisticTasks({ type: "rollback" });
      });
    });
  };

  const handleChangeTask = (task: Task, formData: FormData) => {
    setOptimisticTasks({
      type: "update",
      payload: task,
    });
    startTransition(async () => {
      await updateTask(formData).catch((error) => {
        setError(error);
        setOptimisticTasks({ type: "rollback" });
      });
    });
  };

  return (
    <>
      {error && (
        <div className="alert alert-error" role="alert">
          <div>
            <span>{error.message}</span>
          </div>
        </div>
      )}
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
              key={`${task.id}-${task.isOptimistic ? "optimistic" : "server"}`}
              task={task}
              isOptimistic={!!task.isOptimistic}
              onChange={handleChangeTask}
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
