import { AxiosError } from "axios";
import {
  addTaskApi,
  deleteTaskApi,
  editTaskApi,
  getTasksApi
} from "../api/task/taskApi";

// Add a new task
export const addTask = async (
  title: string,
  description: string
): Promise<any> => {
  try {
    const response = await addTaskApi(title, description);
    return response.data; // Return the full response
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;
    throw new Error(axiosError.response?.data?.message || "Failed to add task");
  }
};

// Edit a task by ID
export const updateTask = async (
  taskId: number, 
  title: string, 
  description: string, 
  rank?: number
) => {
  try {
    const response = await axios.put(`${API_URL}/task/update-task/${taskId}`, {
      title,
      description,
      rank
    });
    return response.data;
  } catch (error) {
    throw error;
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
export const deleteTask = async (id: number): Promise<any> => {
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
