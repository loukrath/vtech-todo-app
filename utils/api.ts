import { AxiosResponse } from "axios";

import { ITask } from "@/types/tasks";
import axios from "@/libs/axios"

const baseUrl = process.env.apiUrl;

export const getAllTodos = async (): Promise<ITask[]> => {
  const { data } = await axios.get(`https://api.todo.livecmt.com/api/todo`);

  return data;
}

export const addNewTask = async (task: { todo: string }): Promise<AxiosResponse<ITask>> => {
  return await axios.post(`https://api.todo.livecmt.com/api/todo`, task);
}

export const updateTask = async (task: ITask): Promise<AxiosResponse<ITask>> => {
  return await axios.put(`https://api.todo.livecmt.com/api/todo/${task.id}`, task);
}

export const deleteTask = async (id: string): Promise<void> => {
  await axios.delete(`https://api.todo.livecmt.com/api/todo/${id}`);
}
