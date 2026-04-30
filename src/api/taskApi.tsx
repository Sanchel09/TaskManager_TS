import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Task } from "../types";
import axios from "axios";
import { API_BASE_URL } from "../utility/Constant";

export const fetchTasks = createAsyncThunk<Task[]>(
  "tasks,fetchTasks",
  async () => {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  },
);

export const addTask = createAsyncThunk<Task, Task>(
  "tasks/addTask",
  async (task) => {
    const response = await axios.post(API_BASE_URL, task);
    return response.data;
  },
);

export const deleteTask = createAsyncThunk<number, number>(
  "tasks/deleteTask",
  async (id) => {
    await axios.delete(`${API_BASE_URL}/${id}`);
    // return response.data;
    return id;
  },
);

export const updateTask = createAsyncThunk<Task, Task>(
  "tasks/updateTask",
  async (updatedData) => {
    const response = await axios.put(
      `${API_BASE_URL}/${updatedData.id}`,
      updatedData,
    );
    return response.data;
  },
);
