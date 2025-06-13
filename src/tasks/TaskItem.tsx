"use client";
import { useEffect, useOptimistic, useState, useTransition } from "react";
import { undoTask, completeTask, updateTask } from "./tasks";
import { CircleCheckIcon, CircleIcon } from "./icons";
import type { Task } from "./types";

export const TaskItem = ({
  task,
  isOptimistic,
}: {
  task: Task;
  isOptimistic: boolean;
}) => {
  const [isPending, startTransition] = useTransition();
  const [isEditing, setIsEditing] = useState(false);
  const [optimisticTask, setOptimisticTask] = useOptimistic<
    Task,
    Partial<Task>
  >(task, (state, newTask) => {
    return { ...state, ...newTask };
  });
  useHandleEscapeKey({ enabled: isEditing, handle: () => setIsEditing(false) });
  return (
    <li
      data-loading={isPending || isOptimistic ? "true" : undefined}
      className="group list-row data-loading:skeleton"
    >
      <form
        action={(event) =>
          startTransition(async () => {
            setOptimisticTask({
              completed_at: task.completed_at ? null : new Date().toISOString(),
            });
            await (task.completed_at ? undoTask(event) : completeTask(event));
          })
        }
      >
        <input type="hidden" name="id" value={task.id} />
        <div
          className="tooltip"
          data-tip={optimisticTask.completed_at ? "Undo" : "Complete"}
        >
          <button
            type="submit"
            className="btn btn-square btn-ghost text-white hover:text-primary group-data-loading:text-accent"
            disabled={isPending}
          >
            <span className="sr-only">
              {optimisticTask.completed_at ? "Undo" : "Complete"}
            </span>
            {optimisticTask.completed_at ? <CircleCheckIcon /> : <CircleIcon />}
          </button>
        </div>
      </form>
      <div onDoubleClick={() => setIsEditing(true)}>
        {isEditing ? (
          <form
            action={(event) =>
              startTransition(async () => {
                const description = event.get("description");
                setOptimisticTask({ description: description?.toString() });
                await updateTask(event);
                setIsEditing(false);
              })
            }
          >
            <input type="hidden" name="id" value={task.id} />
            <input
              name="description"
              type="text"
              className="input input-bordered w-full"
              defaultValue={task.description}
              onBlur={() => setIsEditing(false)}
            />
            <button type="submit" className="hidden" disabled={isPending}>
              Save
            </button>
          </form>
        ) : (
          <>
            <div>{optimisticTask.description}</div>
            <div className="text-xs uppercase font-semibold flex justify-between">
              <span className="opacity-60">
                {formatter.format(new Date(optimisticTask.created_at))}
              </span>
              {optimisticTask.completed_at ? (
                <span className="flex gap-1">
                  <span className="opacity-60">Completed on</span>
                  <span className="text-accent">
                    {formatter.format(new Date(optimisticTask.completed_at))}
                  </span>
                </span>
              ) : null}
            </div>
          </>
        )}
      </div>
      <button
        type="button"
        className="hidden"
        onClick={() => setIsEditing(true)}
      >
        Edit
      </button>
    </li>
  );
};

const formatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "short",
  timeStyle: "short",
});

const useHandleEscapeKey = ({
  enabled,
  handle,
}: {
  enabled: boolean;
  handle: () => void;
}) => {
  useEffect(() => {
    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handle();
      }
    };

    if (enabled) {
      window.addEventListener("keyup", handleKeyUp);
    }

    return () => {
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [enabled, handle]);
};
