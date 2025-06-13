"use server";
import { db } from "../db";

const wait = (ms = 2000) => new Promise((resolve) => setTimeout(resolve, ms));

export const getTasks = async (filter?: string) => {
  await wait();
  const query = db
    .from("tasks")
    .select("*")
    .order("created_at", { ascending: false });
  if (filter === "active") {
    query.is("completed_at", null);
  } else if (filter === "completed") {
    query.not("completed_at", "is", null);
  }
  const { data, error } = await query;
  const { count: totalActiveTasks, error: errorActiveTask } = await db
    .from("tasks")
    .select("id", { count: "exact", head: true })
    .is("completed_at", null);

  if (error || errorActiveTask) {
    throw new Error(
      `Error fetching tasks: ${
        error ? error.message : errorActiveTask?.message
      }`
    );
  }

  return { tasks: data, totalActiveTasks: totalActiveTasks ?? 0 };
};

export const addTask = async (formData: FormData) => {
  await wait();
  const description = formData.get("description");
  if (!description || typeof description !== "string") {
    throw new Error("Invalid task description");
  }

  const { data, error } = await db.from("tasks").insert([{ description }]);

  if (error) {
    throw new Error(`Error adding task: ${error.message}`);
  }
};

export const completeTask = async (formData: FormData) => {
  await wait();
  const id = formData.get("id");
  if (!id || typeof id !== "string") {
    throw new Error("Invalid task ID");
  }

  const { data, error } = await db
    .from("tasks")
    .update({ completed_at: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    throw new Error(`Error completing task: ${error.message}`);
  }
};

export const undoTask = async (formData: FormData) => {
  await wait();
  const id = formData.get("id");
  if (!id || typeof id !== "string") {
    throw new Error("Invalid task ID");
  }

  const { data, error } = await db
    .from("tasks")
    .update({ completed_at: null })
    .eq("id", id);

  if (error) {
    throw new Error(`Error undoing task: ${error.message}`);
  }
};

export const clearCompleted = async () => {
  await wait();
  const { data, error } = await db
    .from("tasks")
    .delete()
    .not("completed_at", "is", null);

  if (error) {
    throw new Error(`Error clearing completed tasks: ${error.message}`);
  }
};

export const updateTask = async (formData: FormData) => {
  await wait();
  const id = formData.get("id");
  if (!id || typeof id !== "string") {
    throw new Error("Invalid task ID");
  }

  const description = formData.get("description");
  if (!description || typeof description !== "string") {
    throw new Error("Invalid task description");
  }

  const { data, error } = await db
    .from("tasks")
    .update({ description })
    .eq("id", id);

  if (error) {
    throw new Error(`Error updating task: ${error.message}`);
  }
};
