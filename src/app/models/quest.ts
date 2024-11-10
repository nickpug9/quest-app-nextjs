import { Task } from "../models/task";
export interface Quest {
  id: number;
  title: string;
  description?: string;
  tasks: Task[];
}
