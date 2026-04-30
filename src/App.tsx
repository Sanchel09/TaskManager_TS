import { useEffect, useMemo, useState } from "react";
import "./App.css";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import type { FilterStatus, Task } from "./types";
import TaskList from "./components/TaskList";
import TaskItem from "./components/TaskItem";
import FullPageSpinner from "./components/FullPageSpinner";
import { addTask, deleteTask, fetchTasks, updateTask } from "./api/taskApi";
import SearchTask from "./components/SearchTask";
import { useDebounce } from "./utility/useDebounce";

function App() {
  const [newTask, setNewTask] = useState<Task>({
    title: "",
    completed: false,
  });
  const [searchData, setSearchData] = useState<string>("");
  const [filter, setFilter] = useState<FilterStatus>("all");
  const debouncedSearch = useDebounce(searchData, 500);
  const dispatch = useAppDispatch();
  const {
    data: tasks,
    pending,
    error,
  } = useAppSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  // 🔹 Handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNewTask((prev) => ({ ...prev, title: e.target.value }));
  };

  const submitTask = () => {
    if (!newTask.title.trim()) return;
    dispatch(addTask(newTask));
    setNewTask({ title: "", completed: false });
  };

  const deleteSelectedTask = (id: number): void => {
    dispatch(deleteTask(id));
  };

  const updateProgress = (item: Task): void => {
    dispatch(updateTask({ ...item, completed: !item.completed }));
  };

  const handleSearchDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchData(e.target.value);
  };

  // 🔹 Derived Data (Correct useMemo usage)
  const filteredTasks = useMemo(() => {
    let data = tasks;

    // status filter
    if (filter === "completed") {
      data = data.filter((task) => task.completed);
    } else if (filter === "pending") {
      data = data.filter((task) => !task.completed);
    }

    // search filter
    return data.filter((task) =>
      task.title.toLowerCase().includes(debouncedSearch.toLowerCase()),
    );
  }, [tasks, filter, debouncedSearch]);

  const handleFilterChange = (value: FilterStatus): void => {
    setFilter(value);
  };

  return (
    <section className="p-5!">
      {pending && <FullPageSpinner />}

      <div className="text-3xl text-center my-5">Mini Todo Project</div>

      <TaskItem
        newTask={newTask}
        handleChange={handleChange}
        submitTask={submitTask}
        handleFilterChange={handleFilterChange}
      />
      <SearchTask
        searchData={searchData}
        handleSearchDataChange={handleSearchDataChange}
      />

      {/* 🔹 Task List */}
      <TaskList
        tasks={filteredTasks}
        deleteTask={deleteSelectedTask}
        updateProgress={updateProgress}
        error={error}
      />

      {/* 🔹 Empty State */}
      {filteredTasks.length === 0 && !pending && (
        <p className="text-center mt-4">No tasks found</p>
      )}
    </section>
  );
}

export default App;
