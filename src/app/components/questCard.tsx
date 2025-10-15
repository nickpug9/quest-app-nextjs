// import TaskGroup from "../components/taskGroup";
// import Quest from "../models/quest";
// import Task from "../models/task";
// import DeleteButton from "./deleteButton";
// import { deleteQuest } from "../utils/questService";

// export default function QuestCard({
//   quest,
//   onAddTask,
//   onDeleteTask,
// }: {
//   quest: Quest;
//   onAddTask: (questId: string, parentId: string, task: Task) => void;
//   onDeleteTask: (taskId: string) => void;
// }) {
//   function handleDeleteQuest(id: string) {
//     deleteQuest(id);
//   }

//   return (
//     <div className="quest-item bg-slate-50 text-sky-900 my-2 flex flex-col rounded-lg">
//       <div className="text-xl font-bold border-2 rounded-lg border-slate-300 px-1 py-2 bg-orange-100 flex justify-between items-center">
//         <h2>{quest.title} hhere</h2>
//         <DeleteButton questId={quest.id} onDelete={handleDeleteQuest} />
//       </div>

//       <TaskGroup
//         tasks={quest.tasks}
//         questId={quest.id}
//         parentId=""
//         onAddTask={onAddTask}
//         onDeleteTask={onDeleteTask}
//       />
//     </div>
//   );
// }
