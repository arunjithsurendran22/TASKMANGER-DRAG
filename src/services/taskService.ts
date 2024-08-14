import { AxiosError } from "axios";
import {
  addTaskApi,
  deleteTaskApi,
  editTaskApi,
  getTasksApi,
  updateTaskStatusApi,
} from "../api/task/taskApi";

// Add a new task
export const addTask = async (name: string): Promise<any> => {
  try {
    const response = await addTaskApi(name);
    return response.data; // Return the full response
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;
    throw new Error(axiosError.response?.data?.message || "Failed to add task");
  }
};

// Edit a task by ID
export const updateTask = async (id: string, name: string): Promise<any> => { 
  try {
    const response = await editTaskApi(id, name);
    return response.data; // Return the full response
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;
    throw new Error(
      axiosError.response?.data?.message || "Failed to edit task"
    );
  }
};

// Update task status by ID
export const updateTaskStatus = async (
  id: string,
  newStatus: string // Updated to match backend values
): Promise<any> => {
  try {
    const response = await updateTaskStatusApi(id, newStatus);
    return response.data; 
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;
    throw new Error(
      axiosError.response?.data?.message || "Failed to update task status"
    );
  }
};

// Fetch tasks
export const getTasks = async (): Promise<any> => {
  try {
    const response = await getTasksApi();
    return response.data; // Return the full response
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;
    throw new Error(axiosError.response?.data?.message || "Failed to get tasks");
  }
};

// Delete a task by ID
export const deleteTask = async (id: string): Promise<any> => {
  try {
    const response = await deleteTaskApi(id);
    return response.data; // Return the full response
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;
    throw new Error(
      axiosError.response?.data?.message || "Failed to delete task"
    );
  }
};
