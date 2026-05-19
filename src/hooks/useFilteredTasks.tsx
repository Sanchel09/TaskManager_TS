import { useMemo } from "react";
import type { FilterStatus, Task } from "../types";

const useFilteredTasks = (
  tasks: Task[],
  filter: FilterStatus,
  search: string,
) => {
  return useMemo(() => {
    let data = tasks;

    if (filter === "completed") {
      data = data.filter((task) => task.completed);
    } else if (filter === "pending") {
      data = data.filter((task) => !task.completed);
    }

    return data.filter((task) =>
      task.title.toLowerCase().includes(search.toLowerCase()),
    );
  }, [tasks, filter, search]);
};

export default useFilteredTasks;
