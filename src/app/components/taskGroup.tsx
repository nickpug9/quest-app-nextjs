"use client";
import TaskItem from "../components/taskItem";
import AddTaskForm from "../components/addTaskForm";
import Task from "../models/task";
import { updateTaskStatus } from "../utils/taskService";

export default function TaskGroup({
  tasks,
  questId,
  parentId,
  onAddTask,
  onDeleteTask,
}: {
  tasks: Task[];
  questId: string;
  parentId: string;
  onAddTask: (questId: string, parentId: string, task: Task) => void;
  onDeleteTask: (taskId: string) => void;
}) {
  const handleUpdateTaskStatus = async (taskId: string) => {
    await updateTaskStatus(taskId, status);
  };

  return (
    <>
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggleStatus={handleUpdateTaskStatus}
            onDelete={onDeleteTask}
          />
        ))
      ) : (
        <p className="p-1">No tasks for this quest</p>
      )}
      <AddTaskForm
        questId={questId}
        parentId={parentId}
        onAddTask={onAddTask}
      />
    </>
  );
}
