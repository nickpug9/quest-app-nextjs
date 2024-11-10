import Dexie from "dexie";

export const db = new Dexie("myDatabase");

db.version(1).stores({
  quests: "++id, title, description",
  tasks: "++id, questId, title, description, status, value",
});

export default db;
