import type { Task } from "../types";
import axios from "axios";
import { API_BASE_URL } from "../utility/Constant";

export const fetchTasksApi = () => axios.get(API_BASE_URL);

export const addTaskApi = (task: Task) => axios.post(API_BASE_URL, task);

export const deleteTaskApi = (id: number) =>
  axios.delete(`${API_BASE_URL}/${id}`);

export const updateTaskApi = (updatedData: Task) => {
  return axios.put(`${API_BASE_URL}/${updatedData.id}`, updatedData);
};
