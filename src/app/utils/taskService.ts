import db from "./db";

export async function createTask(
  questId: number,
  title: string,
  description: string,
  status: string,
  value: number
) {
  const taskId = await db
    .table("tasks")
    .add({ questId, title, description, status, value });
  return taskId;
}

export async function getTasksForQuests(questId: number) {
  return await db.table("tasks").where("questId").equals(questId).toArray();
}
