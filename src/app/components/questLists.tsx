"use client"; // This is a client component 👈🏽

import { useState, useEffect } from "react";

import { createQuest, getQuests } from "../utils/questService";
import { createTask, getTasksForQuests } from "../utils/taskService";
import { Quest } from "../models/quest";
import TaskItem from "../components/taskItem";

const QuestLists = () => {
  const [questTitle, setQuestTitle] = useState("");
  const [quests, setQuests] = useState<Quest[]>([]);
  const [questId, setQuestId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);
  const [currentQuestId, setCurrentQuestId] = useState<number>(0);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [newTaskStatus, setNewTaskStatus] = useState("Active");
  const [newTaskValue, setNewTaskValue] = useState(1);

  const handleAddQuest = async () => {
    const newQuestId = await createQuest(questTitle, "");
    setQuestId(parseInt(newQuestId, 10));
  };

  const handleAddTask = async () => {
    // const newTask: Task = {
    //     id: new Date().getTime(),
    //     title: newTaskTitle,
    //     description: newTaskDescription,
    //     status: newTaskStatus,
    //     value: newTaskValue
    // }
    try {
      // Add task to the quest
      const addedTask = await createTask(
        currentQuestId!,
        newTaskTitle,
        newTaskDescription,
        newTaskStatus,
        newTaskValue
      );

      // update quest state with new task
      if (addedTask) {
        setQuests((prevQuests) => {
          const updatedQuests = [...prevQuests];
          const questIndex = updatedQuests.findIndex(
            (quest) => quest.id === currentQuestId
          );
          if (questIndex !== -1) {
            updatedQuests[questIndex] = {
              ...updatedQuests[questIndex],
              tasks: [...updatedQuests[questIndex].tasks, addedTask],
            };
          }
          return updatedQuests;
        });
      } else {
        console.error("Failed to add task");
      }
    } catch (error) {
      console.error("Error Addingtask: ", error);
    }

    // Close form and reset defaults
    setShowAddTaskForm(false);
    setNewTaskTitle("");
    setNewTaskDescription("");
    setNewTaskStatus("Active");
    setNewTaskValue(1);
  };

  const handleCancelAddTask = () => {
    // Close form and reset defaults
    setShowAddTaskForm(false);
    setNewTaskTitle("");
    setNewTaskDescription("");
    setNewTaskStatus("Active");
    setNewTaskValue(1);
  };

  useEffect(() => {
    const fetchQuests = async () => {
      const fetchedQuests = await getQuests();
      setQuests(fetchedQuests);
    };
    fetchQuests();
  }, []);

  useEffect(() => {
    const fetchQuestsAndTasks = async () => {
      try {
        const fetchedQuests = await getQuests();
        const questsWithTasks = await Promise.all(
          fetchedQuests.map(async (quest) => {
            const tasks = await getTasksForQuests(quest.id);
            return { ...quest, tasks };
          })
        );
        setQuests(questsWithTasks);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching quests and tasks:", error);
        setError("An Error occured. Please try again later.");
        setIsLoading(false);
      }
    };
    fetchQuestsAndTasks();
  }, []);

  return (
    <div>
      <div className="flex gap-4 items-center flex-col sm:flex-row">
        <input
          type="text"
          value={questTitle}
          onChange={(e) => setQuestTitle(e.target.value)}
          className="text-black"
        />
        <button className="text-black" onClick={handleAddQuest}>
          Add Quest
        </button>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div>
          {quests.map((quest) => (
            <div
              key={quest.id}
              className="quest-item bg-slate-50 text-sky-900 my-2 p-1"
            >
              <h2 className="font-bold">{quest.title}</h2>
              <span>
                <button
                  onClick={() => {
                    setShowAddTaskForm(true);
                    setCurrentQuestId(quest.id);
                  }}
                >
                  Add Task
                </button>
              </span>
              {showAddTaskForm && currentQuestId === quest.id && (
                <div>
                  <input
                    type="text"
                    placeholder="Task Title"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                  />
                  <textarea
                    placeholder="Task Description"
                    value={newTaskDescription}
                    onChange={(e) => setNewTaskDescription(e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="Task Points"
                    value={newTaskValue}
                    onChange={(e) =>
                      setNewTaskValue(parseInt(e.target.value, 10))
                    }
                  />
                  <button onClick={handleAddTask}>Add Task</button>
                  <button onClick={handleCancelAddTask}>Cancel Task</button>
                </div>
              )}
              {quest.tasks.length > 0 ? (
                quest.tasks.map((task) => (
                  <TaskItem key={task.id} task={task} />
                ))
              ) : (
                <p>No tasks for this quest</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuestLists;
