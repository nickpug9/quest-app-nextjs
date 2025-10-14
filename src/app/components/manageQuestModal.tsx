"use client";

import Modal from "../components/modal";
import AddQuestForm from "../components/addQuestForm";
// import Quest from "../models/quest";

export default function ManageQuestModal({
  show,
  onClose,
  onQuestAdded,
}: {
  show: boolean;
  onClose: () => void;
  onQuestAdded: (quest: string) => void;
}) {
  return (
    <Modal show={show} onClose={onClose}>
      <AddQuestForm onClose={onClose} onQuestAdded={onQuestAdded} />
    </Modal>
  );
}
