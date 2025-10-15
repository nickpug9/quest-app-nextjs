"use client";
export default function DeleteButton({
  questId,
  onDelete,
}: {
  questId: string;
  onDelete: (id: string) => void;
}) {
  return (
    <button
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-0 px-2 rounded"
      onClick={() => onDelete(questId)}
    >
      ×
    </button>
  );
}
