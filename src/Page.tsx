"use server-entry";

import "./page.css";
import "./client";
import { addTask, getTasks } from "./tasks";

export async function Page() {
  const tasks = await getTasks();

  return (
    <html lang="en">
      <head>
        <title>Parcel React Server App</title>
      </head>
      <body>
        <h1>Todo</h1>
        {tasks.length === 0 ? (
          <div>No tasks</div>
        ) : (
          <ul>
            {tasks.map((task) => (
              <li key={task.id}>
                {task.description} {task.completed_at ? "✓" : "✗"}
              </li>
            ))}
          </ul>
        )}
        <hr />
        <form action={addTask}>
          <label>
            New task: <input name="name" />
          </label>
          <button type="submit">Submit</button>
        </form>
      </body>
    </html>
  );
}
