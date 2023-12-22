import { AxiosResponse } from "axios";

import { ITask } from "@/types/tasks";
import axios from "@/libs/axios"

const baseUrl = process.env.apiUrl;

export const getAllTodos = async (): Promise<ITask[]> => {
  const { data } = await axios.get(`${baseUrl}/todo`);

  return data;
}

export const addNewTask = async (task: { todo: string }): Promise<AxiosResponse<ITask>> => {
  return await axios.post(`${baseUrl}/todo`, task);
}

export const updateTask = async (task: ITask): Promise<AxiosResponse<ITask>> => {
  return await axios.put(`${baseUrl}/todo/${task.id}`, task);
}

export const deleteTask = async (id: string): Promise<void> => {
  await axios.delete(`${baseUrl}/todo/${id}`);
}
