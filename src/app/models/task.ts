// import { IndexableType } from "dexie";

export interface Task {
  id: string;
  questId: string;
  title: string;
  description?: string;
  status: string;
  value: number;
}
