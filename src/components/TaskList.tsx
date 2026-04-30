import type { Task } from "../types";

interface TaskListProps {
  tasks: Task[];
  deleteTask: (id: number) => void;
  updateProgress: (item: Task) => void;
  error: string | null;
}

export default function TaskList({
  tasks,
  deleteTask,
  updateProgress,
  error,
}: TaskListProps) {
  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="flex flex-col sm:flex-row sm:items-center justify-between bg-gray-50 border border-gray-200 rounded p-4! shadow-sm"
        >
          {/* Task Info */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <p className="font-semibold text-gray-800">{task.title}</p>
            <span
              className={`${
                task.completed ? "text-green-600" : "text-yellow-600"
              } font-medium`}
            >
              {task.completed ? "Completed" : "Pending"}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 mt-2! sm:mt-0">
            <button
              onClick={() => deleteTask(task.id!)}
              className="bg-red-500 text-white px-3! py-1! rounded hover:bg-red-600"
            >
              Delete
            </button>
            <button
              onClick={() => updateProgress(task)}
              className="bg-blue-500 text-white px-3! py-1! rounded hover:bg-blue-600"
            >
              Update
            </button>
          </div>

          {/* Error Message */}
          {error && <div className="text-red-600 mt-2! sm:mt-0!">{error}</div>}
        </div>
      ))}
    </div>
  );
}
