import db from "./db";
import { Task } from "../models/task";
import { IndexableType } from "dexie";

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

export async function deleteTask(id: IndexableType) {
  return await db
    .table("tasks")
    .where("id")
    .equals(id)
    .delete()
    .then(() => {
      // const updatedTasks = tasks.filter(task => task.id !== id);

      console.log("Task Deleted successfully");
      // return updatedTasks;
    })
    .catch((err) => {
      console.error("Error deleting task:", err);
    });
}
