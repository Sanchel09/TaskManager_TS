import type { FilterStatus, Task } from "../types";

interface TaskItemProps {
  newTask: Task;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  submitTask: () => void;
  handleFilterChange: (value: FilterStatus) => void;
}

export default function TaskItem({
  newTask,
  handleChange,
  submitTask,
  handleFilterChange,
}: TaskItemProps) {
  return (
    <div className="flex items-center gap-2 mb-5!">
      <input
        type="text"
        value={newTask.title}
        onChange={handleChange}
        name="title"
        className="flex-grow border border-gray-300 px-4! py-2! rounded font-semibold"
        placeholder="Enter task"
      />

      <button
        onClick={submitTask}
        className="bg-blue-500 text-white px-4! py-2! rounded hover:bg-blue-600 cursor-pointer"
      >
        Add Task
      </button>

      <button
        onClick={() => handleFilterChange("completed")}
        className="bg-green-500 text-white px-4! py-2! rounded hover:bg-green-600 cursor-pointer"
      >
        Show Completed
      </button>

      <button
        onClick={() => handleFilterChange("pending")}
        className="bg-yellow-500 text-white px-4! py-2! rounded hover:bg-yellow-600 cursor-pointer"
      >
        Show Pending
      </button>

      <button
        onClick={() => handleFilterChange("all")}
        className="bg-red-500 text-white px-4! py-2! rounded hover:bg-red-600 cursor-pointer"
      >
        Show All
      </button>
    </div>
  );
}
