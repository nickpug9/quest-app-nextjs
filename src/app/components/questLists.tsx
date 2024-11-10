"use client"; // This is a client component 👈🏽

import { useState, useEffect } from "react";

import { createQuest, getQuests } from "../utils/questService";
import { createTask, getTasksForQuests } from "../utils/taskService";

const QuestLists = () => {
  interface Quest {
    id: number;
    title: string;
    description: string;
  }

  interface Task {
    id: number;
    questId: number;
    title: string;
    description: string;
    status: string;
    value: number;
  }

  const [questTitle, setQuestTitle] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [questId, setQuestId] = useState<number | null>(null);
  const [quests, setQuests] = useState<Quest[]>([]);
  const [selectedQuest, setSelectedQuest] = useState<number | null>(null);
  const [tasksForSelectedQuest, setTasksForSelectedQuest] = useState<Task[]>(
    []
  );

  const handleAddQuest = async () => {
    const newQuestId = await createQuest(questTitle, "");
    setQuestId(parseInt(newQuestId, 10));
  };

  const handleAddTask = async () => {
    await createTask(questId || 0, taskTitle, "", "", 0);
  };

  const handleQuestSelect = (questId: number) => {
    setSelectedQuest?.(questId);
  };

  useEffect(() => {
    const fetchQuests = async () => {
      const fetchedQuests = await getQuests();
      setQuests(fetchedQuests);
    };
    fetchQuests();
  }, []);

  useEffect(() => {
    const fetchTasksForQuest = async () => {
      if (selectedQuest) {
        const tasks = await getTasksForQuests(selectedQuest);
        setTasksForSelectedQuest(tasks);
      }
    };
    fetchTasksForQuest();
  }, [selectedQuest]);

  return (
    <div className="flex gap-4 items-center flex-col sm:flex-row">
      <input
        type="text"
        value={questTitle}
        onChange={(e) => setQuestTitle(e.target.value)}
      />
      <button onClick={handleAddQuest}>Add Quest</button>
      <input
        type="text"
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
      />
      <button onClick={handleAddTask}>Add Task</button>

      <select onChange={(e) => handleQuestSelect(parseInt(e.target.value, 10))}>
        <option value="0">Select a Quest</option>
        {quests.map((quest) => (
          <option key={quest.id} value={quest.id}>
            {quest.title}
          </option>
        ))}
      </select>
      {selectedQuest && (
        <div>
          <h2>Tasks for {quests.find((q) => q.id === selectedQuest)?.title}</h2>
          {/* fetch and display tasks */}
          <ul>
            {tasksForSelectedQuest.map((task) => (
              <li key={task.id}>{task.title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default QuestLists;
