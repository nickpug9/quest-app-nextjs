import { Task } from "../models/task";
import {IndexableType} from "dexie";
export interface Quest {
  id: IndexableType;
  title: string;
  description?: string;
  tasks: Task[];
}
