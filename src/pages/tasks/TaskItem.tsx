"use client";
import { useEffect, useRef, useState } from "react";
import type { Task } from "../../types";
import { CircleCheckIcon, CircleIcon } from "./icons";

export const TaskItem = ({
  task,
  isOptimistic,
  onChange,
}: {
  task: Task;
  isOptimistic: boolean;
  onChange: (task: Task, formData: FormData) => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  useHandleEscapeKey({ enabled: isEditing, handle: () => setIsEditing(false) });
  return (
    <li
      data-loading={isOptimistic ? "true" : undefined}
      className="group list-row data-loading:skeleton data-error:bg-error data-error:text-error-content"
    >
      <form
        action={() => {
          const formData = new FormData();
          const completed_at = task.completed_at
            ? "" // If the task is completed, we want to mark it as not completed
            : new Date().toISOString(); // If the task is not completed, we want to mark it as completed

          formData.append("id", task.id);
          formData.append("completed_at", completed_at);
          onChange(
            {
              ...task,
              completed_at: completed_at || null,
            },
            formData
          );
        }}
      >
        <input type="hidden" name="id" value={task.id} />
        <div
          className="tooltip"
          data-tip={task.completed_at ? "Undo" : "Complete"}
        >
          <button
            type="submit"
            className="btn btn-square btn-ghost hover:text-primary group-data-loading:text-accent"
          >
            <span className="sr-only">
              {task.completed_at ? "Undo" : "Complete"}
            </span>
            {task.completed_at ? <CircleCheckIcon /> : <CircleIcon />}
          </button>
        </div>
      </form>
      {/** biome-ignore lint/a11y/noStaticElementInteractions: there is an Edit button too */}
      <div
        onDoubleClick={() => {
          setIsEditing(true);
          setTimeout(() => {
            inputRef.current?.select(); // Select the input text on edit
          });
        }}
      >
        {isEditing ? (
          <form
            action={(formData) => {
              setIsEditing(false);
              const description = formData.get("description");
              if (description === null) {
                return;
              }
              onChange({ ...task, description: description.toString() }, formData);
            }}
          >
            <input type="hidden" name="id" value={task.id} />
            <input
              ref={inputRef}
              name="description"
              type="text"
              className="input input-bordered w-full"
              defaultValue={task.description}
              onBlur={() => setIsEditing(false)}
            />
            <button type="submit" className="hidden">
              Save
            </button>
          </form>
        ) : (
          <>
            <div>{task.description}</div>
            <div className="text-xs uppercase font-semibold flex justify-between">
              <span className="opacity-80">
                {formatter.format(new Date(task.created_at))}
              </span>
              {task.completed_at ? (
                <span className="flex gap-1">
                  <span className="opacity-80">Completed on</span>
                  <span className="text-accent">
                    {formatter.format(new Date(task.completed_at))}
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
        onClick={() => {
          setIsEditing(true);
          setTimeout(() => {
            inputRef.current?.select(); // Select the input text on edit
          });
        }}
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
