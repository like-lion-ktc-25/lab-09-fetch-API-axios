import type { Todo } from "../types/todoApp";
import axios from "./axiosConfig";

export const getTodos = async (): Promise<Todo[] | void> => {
  try {
    const response = await axios.get<Todo[]>("todolist");
    return response.data;
  } catch (error) {
    console.error("Error fetching todos:", error);
  }
};
