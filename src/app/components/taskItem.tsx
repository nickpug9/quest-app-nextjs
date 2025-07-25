// import { IndexableType } from "dexie";
import { Task } from "../models/task";
const TaskItem = ({
  task,
  onDelete,
}: {
  task: Task;
  onDelete: (taskId: string) => void;
  tasks: Task[];
}) => {
  return (
    <div className="flex flex-col px-2 border-b-2 border-slate-400">
      <span className="flex justify-between p-1">
        <button
          className="bg-blue-200 hover:bg-gray-500 text-white font-bold py-0 px-3 m-0  rounded content-center"
          onClick={() => onDelete(task.id)}
        ></button>
        <h4 className="flex-1 px-1">{task.title}</h4>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-0 px-2 m-0 rounded content-center"
          onClick={() => onDelete(task.id)}
        >
          -
        </button>
      </span>
      <p className="ml-2">{task.description}</p>
    </div>
  );
};

export default TaskItem;
