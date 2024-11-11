import { Task } from "../models/task";
const TaskItem = ({ task }: { task: Task }) => {
  return (
    <div className="flex flex-col px-2 border-b-2 border-slate-400">
      <p>{task.title}</p>
      <p className="ml-2">{task.description}</p>
    </div>
  );
};

export default TaskItem;
