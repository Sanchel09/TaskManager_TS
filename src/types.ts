export type Task = {
  id?: number;
  title: string;
  completed: boolean;
};

export type TaskState = {
  data: Task[];
  pending: boolean;
  error: string | null;
};

export type FilterStatus = "all" | "completed" | "pending";
