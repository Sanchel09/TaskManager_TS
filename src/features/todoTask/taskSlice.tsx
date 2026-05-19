import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addTaskApi,
  deleteTaskApi,
  fetchTasksApi,
  updateTaskApi,
} from "../../api/taskApi";
import type { Task, TaskState } from "../../types";

const initialState: TaskState = {
  data: [],
  error: null,
  pending: false,
};

export const fetchTasks = createAsyncThunk<Task[]>(
  "tasks/fetchTasks",
  async (_, thunkAPI) => {
    try {
      const response = await fetchTasksApi();
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const addTask = createAsyncThunk<Task, Task>(
  "tasks/addTask",
  async (data: Task, thunkAPI) => {
    try {
      const response = await addTaskApi(data);
      return response.data; // send task back to slice
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const deleteTask = createAsyncThunk<number, number>(
  "tasks/deleteTask",
  async (id: number, thunkAPI) => {
    try {
      await deleteTaskApi(id);
      return id; // send task back to slice
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const updateTask = createAsyncThunk<Task, Task>(
  "tasks/updateTask",
  async (data: Task, thunkAPI) => {
    try {
      const response = await updateTaskApi(data);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTasks.pending, (state) => {
      state.error = null;
      state.pending = true;
    });

    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.data = action.payload;
      state.pending = false;
    });

    builder.addCase(fetchTasks.rejected, (state, action) => {
      // state.error = action.error.message || "Failed to fetch tasks";
      state.error = (action.payload as string) || "Failed to fetch tasks";
      state.pending = false;
    });

    builder.addCase(addTask.pending, (state) => {
      state.error = null;
      state.pending = true;
    });

    builder.addCase(addTask.fulfilled, (state, action) => {
      state.data.push(action.payload);
      state.pending = false;
    });

    builder.addCase(addTask.rejected, (state, action) => {
      // state.error = action.error.message || "Failed to add task";
      state.error = (action.payload as string) || "Failed to add tasks";
      state.pending = false;
    });

    builder.addCase(deleteTask.pending, (state) => {
      state.error = null;
      state.pending = true;
    });

    builder.addCase(deleteTask.fulfilled, (state, action) => {
      //if id is returned then we can use action.payload else if void is returned use below
      state.data = state.data.filter((task) => task.id !== action.meta.arg);
      state.pending = false;
    });

    builder.addCase(deleteTask.rejected, (state, action) => {
      // state.error = action.error.message || "Failed to delete task";
      state.error = (action.payload as string) || "Failed to delete task";
      state.pending = false;
    });

    builder.addCase(updateTask.pending, (state) => {
      state.pending = true;
    });

    builder.addCase(updateTask.fulfilled, (state, action) => {
      const index = state.data.findIndex(
        (item) => item.id === action.payload.id,
      );
      if (index !== -1) {
        state.data[index] = action.payload; // Immer handles immutable update automatically
      }
      state.pending = false;
    });

    builder.addCase(updateTask.rejected, (state, action) => {
      // state.error = action.error.message || "Failed to update task";
      state.error = (action.payload as string) || "Failed to update tasks";
      state.pending = false;
    });
  },
});

export default taskSlice.reducer;
