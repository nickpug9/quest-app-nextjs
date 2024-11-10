import { IndexableType } from "dexie";

export interface Task {
  id: IndexableType;
  questId: number;
  title: string;
  description?: string;
  status: string;
  value: number;
}
