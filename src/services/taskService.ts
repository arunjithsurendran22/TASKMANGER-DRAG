import  { AxiosError } from "axios";
import {
  addTaskApi,
  deleteTaskApi,
  editTaskApi,
  getTasksApi,
  updateRankApi,
} from "../api/task/taskApi";

// Add a new task
export const addTask = async (
  title: string,
  description: string
): Promise<any> => {
  try {
    const response = await addTaskApi(title, description);
    return response.data; 
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;
    throw new Error(axiosError.response?.data?.message || "Failed to add task");
  }
};

// Update a task by ID
export const updateTask = async (
  taskId: number,
  title: string,
  description: string,
): Promise<any> => {
  try {
    const response = await editTaskApi(taskId, title, description);
    return response.data; 
  } catch (error) {
    throw new Error("Failed to update task");
  }
};

// Fetch tasks
export const getTasks = async (): Promise<any> => {
  try {
    const response = await getTasksApi();
    return response.data; 
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;
    throw new Error(
      axiosError.response?.data?.message || "Failed to get tasks"
    );
  }
};

// Delete a task by ID
export const deleteTask = async (id: number): Promise<any> => {
  try {
    const response = await deleteTaskApi(id);
    return response.data; 
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;
    throw new Error(
      axiosError.response?.data?.message || "Failed to delete task"
    );
  }
};

export const updateRank = async (taskId: number, rank: number): Promise<any> => {
  try {
    const response = await updateRankApi(taskId, rank); // Call the API to update the rank
    return response.data; // Return the full response
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;
    throw new Error(
      axiosError.response?.data?.message || "Failed to update task rank"
    );
  }
};
