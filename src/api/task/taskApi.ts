import axiosInstance from "../axios/axiosInstance";
import { AxiosResponse } from "axios";

// Function to add a new task with title and description
export const addTaskApi = (
  title: string,
  description: string
): Promise<AxiosResponse<{ data: any }>> =>
  axiosInstance.post<{ data: any }>("/v1/task/create-task", {
    title,
    description,
  });

// Function to edit an existing task, including title and description
export const editTaskApi = (
  taskId: number,
  title: string,
  description: string
): Promise<AxiosResponse<{ data: any }>> =>
  axiosInstance.put<{ data: any }>(`/v1/task/update-task/${taskId}`, {
    title,
    description,
  });

// Function to delete a task
export const deleteTaskApi = (
  taskId: number
): Promise<AxiosResponse<{ data: { success: boolean } }>> =>
  axiosInstance.delete<{ data: { success: boolean } }>(
    `/v1/task/delete-task/${taskId}`
  );

// Function to get all tasks
export const getTasksApi = (): Promise<AxiosResponse<{ data: any }>> =>
  axiosInstance.get<{ data: any }>("/v1/task/get-all-tasks");
