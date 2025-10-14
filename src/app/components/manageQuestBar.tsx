"use client";

import { useState } from "react";
import ManageQuestModal from "../components/manageQuestModal";
// import Quest from "../models/quest";

export default function ManageQuestBar() {
  const [showModal, setShowModal] = useState(false);
  const [, setQuests] = useState<string[]>([]);

  const handleQuestAdded = (newQuest: string) => {
    setQuests((prev) => [...prev, newQuest]);
  };

  return (
    <>
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          + Add Quest
        </button>
      </div>
      {showModal && (
        <ManageQuestModal
          show={showModal}
          onClose={() => setShowModal(false)}
          onQuestAdded={handleQuestAdded}
        />
      )}
    </>
  );
}
