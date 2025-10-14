"use client";
import TaskItem from "../components/taskItem";
import AddTaskForm from "../components/addTaskForm";
import Task from "../models/task";

export default function TaskGroup({
  tasks,
  questId,
  onAddTask,
  onDeleteTask,
}: {
  tasks: Task[];
  questId: string;
  onAddTask: (questId: string, task: Task) => void;
  onDeleteTask: (taskId: string) => void;
}) {
  return (
    <>
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <TaskItem key={task.id} task={task} onDelete={onDeleteTask} />
        ))
      ) : (
        <p className="p-1">No tasks for this quest</p>
      )}
      <AddTaskForm questId={questId} onAddTask={onAddTask} />
    </>
  );
}
