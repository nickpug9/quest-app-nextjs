"use client";
import TaskGroup from "../components/taskGroup";
import Quest from "../models/quest";
import Task from "../models/task";

export default function QuestCard({
  quest,
  onDeleteQuest,
  onAddTask,
  onDeleteTask,
}: {
  quest: Quest;
  onDeleteQuest: (id: string) => void;
  onAddTask: (questId: string, task: Task) => void;
  onDeleteTask: (taskId: string) => void;
}) {
  return (
    <div className="quest-item bg-slate-50 text-sky-900 my-2 flex flex-col rounded-lg">
      <div className="text-xl font-bold border-2 rounded-lg border-slate-300 px-1 py-2 bg-orange-100 flex justify-between items-center">
        <h2>{quest.title}</h2>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-0 px-2 rounded"
          onClick={() => onDeleteQuest(quest.id)}
        >
          ×
        </button>
      </div>

      <TaskGroup
        tasks={quest.tasks}
        questId={quest.id}
        onAddTask={onAddTask}
        onDeleteTask={onDeleteTask}
      />
    </div>
  );
}
