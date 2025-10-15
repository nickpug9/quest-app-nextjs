import Task from "../models/task";
// import {IndexableType} from "dexie";
export default interface Quest {
  id: string;
  title: string;
  description?: string;
  tasks: Task[];
}
