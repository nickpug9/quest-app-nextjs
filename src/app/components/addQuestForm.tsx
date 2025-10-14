"use client";

import { useState } from "react";
// import Quest from "../models/quest";
import { createQuest } from "../utils/questService";

type AddQuestFormProps = {
  onQuestAdded: (newQuest: string) => void;
  onClose: () => void;
};

export default function AddQuestForm({
  onQuestAdded,
  onClose,
}: AddQuestFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const newQuest = await createQuest(title, description); // ⬅️ Update based on your quest model
      if (newQuest) {
        onQuestAdded(newQuest); // 🪄 Update parent quest state
        onClose();
      }
    } catch (err) {
      console.error("Error creating quest:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Quest Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border px-3 py-2 rounded"
        required
      />
      <textarea
        placeholder="Quest Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border px-3 py-2 rounded"
      />
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Add Quest
        </button>
      </div>
    </form>
  );
}
