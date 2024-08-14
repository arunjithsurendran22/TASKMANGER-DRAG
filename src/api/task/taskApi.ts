import axiosInstance from "../axios/axiosInstance";
import { AxiosResponse } from "axios";

// Define the interface for Task data
export interface Task {
  id: number;
  name: string;
  status: "Pending" | "Completed";
}

// Define the interface for Task Response
export interface TaskResponse {
  task: Task;
}

// Define the interface for Task List Response
export interface TaskListResponse {
  tasks: Task[];
}

// Function to add a new task
export const addTaskApi = (
  name: string
): Promise<AxiosResponse<{ data: any }>> =>
  axiosInstance.post<{ data: any }>("/v1/task/create-task", {
    name,
  });

// Function to edit an existing task
export const editTaskApi = (
  taskId: string,
  name: string
): Promise<AxiosResponse<{ data: any }>> =>
  axiosInstance.put<{ data: any }>(`/v1/task/update-task/${taskId}`, {
    name,
  });

// Function to update the status of a task
export const updateTaskStatusApi = (
  taskId: string,
  newStatus: string
): Promise<AxiosResponse<{ data: any }>> =>
  axiosInstance.put<{ data: any }>(`/v1/task/update-status-task/${taskId}`, {
    newStatus,
  });

// Function to delete a task
export const deleteTaskApi = (
  taskId: string
): Promise<AxiosResponse<{ data: { success: boolean } }>> =>
  axiosInstance.delete<{ data: { success: boolean } }>(
    `/v1/task/delete-task/${taskId}`
  );

// Function to get all tasks
export const getTasksApi = (): Promise<AxiosResponse<{ data: any }>> =>
  axiosInstance.get<{ data: any }>("/v1/task/get-all-tasks");
