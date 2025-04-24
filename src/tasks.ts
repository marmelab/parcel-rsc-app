"use server";
import { db } from "./db";

export const getTasks = async () => {
  const { data, error } = await db
    .from("tasks")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Error fetching tasks: ${error.message}`);
  }

  return data;
};

export const addTask = async (formData: FormData) => {
  const description = formData.get("name");
  if (!description || typeof description !== "string") {
    throw new Error("Invalid task description");
  }

  const { data, error } = await db.from("tasks").insert([{ description }]);

  if (error) {
    throw new Error(`Error adding task: ${error.message}`);
  }
};
