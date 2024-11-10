import { Task } from "../models/task";
const TaskItem = ({ task }: { task: Task }) => {
  return (
    <div>
      <p>{task.title}</p>
      <p>{task.description}</p>
    </div>
  );
};

export default TaskItem;
