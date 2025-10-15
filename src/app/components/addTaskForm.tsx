"use client";

import { useState } from "react";
import { createTask } from "../utils/taskService";
import Task from "../models/task";

export default function AddTaskForm({
  questId,
  parentId,
  onAddTask,
}: {
  questId: string;
  parentId: string;
  onAddTask: (questId: string, praentId: string, newTask: Task) => void;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Active");
  const [value, setValue] = useState(1);

  const handleSubmit = async (e: React.FormEvent) => {
    console.log("handleSubmit");
    e.preventDefault();

    const newTask = await createTask(
      questId,
      parentId,
      title,
      description,
      status,
      value
    );
    if (newTask) {
      onAddTask(questId, parentId, newTask);
      setTitle("");
      setDescription("");
      setStatus("Active");
      setValue(1);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 mt-2"
      data-testid="add-task-form"
    >
      <h2>FORM</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task Title"
        className="text-black p-1 rounded"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Task Description"
        className="text-black p-1 rounded"
      />
      <input
        type="number"
        value={value}
        onChange={(e) => setValue(parseInt(e.target.value, 10))}
        placeholder="Task Points"
        className="text-black p-1 rounded"
        min={1}
      />
      {/* <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="text-black p-1 rounded"
      >
        <option value="Active">Active</option>
        <option value="Completed">Completed</option>
      </select> */}
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
      >
        Add Task
      </button>
    </form>
  );
}
