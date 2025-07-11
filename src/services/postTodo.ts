import type { Todo } from "../types/todoApp";
import axios from "./axiosConfig";

export const addTodo = async (taskName: string): Promise<Todo | void> => {
  try {
    const response = await axios.post<Todo>("todolist", { taskName });
    return response.data;
  } catch (error) {
    console.error("Error adding todo:", error);
  }
};
