import db from "./db";
import { v4 as uuidv4 } from "uuid";

export async function createQuest(title: string, description: string) {
  const questId = uuidv4();
  await db.table("quests").add({ id: questId, title, description });

  return questId;
}

export async function deleteQuest(id: number) {
  const deleted = await db.table("quests").delete(id);
  console.log(db.table("quests").toArray());
  return deleted;
}

export async function getQuests() {
  return await db.table("quests").toArray();
}
