// import { IndexableType } from "dexie";

export default interface Task {
  id: string;
  questId: string;
  parentId: string;
  title: string;
  description?: string;
  status: string;
  value: number;
}
