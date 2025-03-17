"use client"; // This is a client component 👈🏽

import { useState, useEffect } from "react";
import { IndexableType } from "dexie";

import { createQuest, deleteQuest, getQuests } from "../utils/questService";
import {
  createTask,
  getTasksForQuests,
  deleteTask,
} from "../utils/taskService";
import { Quest } from "../models/quest";
import { Task } from "../models/task";
import TaskItem from "../components/taskItem";
import { Background } from "./background";

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
    // const updatedQuests = quests?.push(newQuestId);
    setQuests(prevQuests => [
        ...prevQuests,
      {
        id: newQuestId,
        title: questTitle,
        description: "",
        tasks: []
      }
    ]);
  };
// REVIEW THIS FUNCTION
  const handleDeleteQuest = async (Qid: number) => {
    console.log("Delete task: ", Qid);
     deleteQuest(Qid);

    // const updatedQuests = quests.map((quest) => {
    //   return {
    //     ...quest,
    //   };
    // });

    const updatedQuests = quests?.filter((quest) => quest.id !== Qid) ?? [];
    console.log(updatedQuests);
    setQuests(updatedQuests);

  }

  const handleAddTask = async () => {
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
            console.log("quest index: ", questIndex);
            console.log()
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

  const handleDeleteTask = (taskId: IndexableType) => {
    deleteTask(taskId);

    const updatedQuests = quests.map((quest) => {
      return {
        ...quest,
        tasks: quest.tasks.filter((task) => task.id !== taskId) ?? [],
      };
    });

    setQuests(updatedQuests);
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
        // setQuestTasks(tasks);
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
        <button
          className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleAddQuest}
        >
          Add Quest
        </button>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div>
          {quests.map((quest, el) => (
            <div
              key={quest.id}
              className="quest-item bg-slate-50 text-sky-900 my-2 flex flex-col rounded-lg"
            >
              <div className="text-xl font-bold border-2	 rounded-lg border-slate-300 px-1 py-2 bg-orange-100 flex justify-between align-middle">
              <h2 >
                {quest.title} <span className="flex justify-between p-1"></span>
              </h2>
                <button
                    className=" bg-red-500 hover:bg-red-700 text-white font-bold py-0 px-2 rounded"
                    onClick={() => handleDeleteQuest(quest.id)}
                >
                  x
                </button>
              </div>
              {quest.tasks.length > 0 ? (
                  quest.tasks.map((task) => (
                      <TaskItem
                          key={task.id}
                          task={task}
                    tasks={quest.tasks}
                    onDelete={handleDeleteTask}
                  />
                ))
              ) : (
                <p className="p-1">No tasks for this quest</p>
              )}
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
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-1 mb-1 rounded content-center"
                    onClick={handleAddTask}
                  >
                    Add Task
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-1 mx-1 mb-1 rounded content-center"
                    onClick={handleCancelAddTask}
                  >
                    Cancel
                  </button>
                </div>
              )}
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-0 px-2 rounded content-center	m-auto w-full"
                onClick={() => {
                  setShowAddTaskForm(true);
                  setCurrentQuestId(quest.id);
                }}
              >
                Add Task +
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuestLists;
