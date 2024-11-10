import db from "./db";
import { Task } from "../models/task";

export async function createTask(
  questId: number,
  title: string,
  description: string,
  status: string,
  value: number
) {
  try {
    const taskResult = await db
      .table("tasks")
      .add({ questId, title, description, status, value });
    console.dir(taskResult);
    const taskId = taskResult;
    const newTask: Task = {
      id: taskId,
      questId,
      title,
      description,
      status,
      value,
    };
    return newTask;
  } catch (error) {
    console.error(error);
  }
}

export async function getTasksForQuests(questId: number) {
  return await db.table("tasks").where("questId").equals(questId).toArray();
}
