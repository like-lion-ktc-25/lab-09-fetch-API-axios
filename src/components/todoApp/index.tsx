import { useEffect, useState } from "react";
import { getTodos } from "../../services/getTodo";
import { addTodo } from "../../services/postTodo";
import type { Todo } from "../../types/todoApp";
import { Spin, message } from "antd";

function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTask, setNewTask] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddTodo = async () => {
    if (!newTask.trim()) return;

    setLoading(true);
    try {
      const newItem = await addTodo(newTask);
      if (newItem) {
        message.success("Add task success");
        setTodos((prev) => [...prev, newItem]);
        setNewTask("");
      } else {
        message.error("Failed to add task");
      }
    } catch (error) {
      console.error(error);
      message.error("Error adding task");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getTodos();
        if (data) setTodos(data);
      } catch (error) {
        console.error(error);
        message.error("Failed to fetch tasks");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 400,
        margin: "50px auto",
        padding: 20,
        borderRadius: 8,
        background: "#f9fafb",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#333", marginBottom: 16 }}>
        Todo List
      </h1>

      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          style={{
            flex: 1,
            padding: "8px 12px",
            border: "1px solid #ccc",
            borderRadius: 4,
            outline: "none",
          }}
        />
        <button
          onClick={handleAddTodo}
          style={{
            padding: "8px 12px",
            background: "#007bff",
            color: "white",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          Submit
        </button>
      </div>

      <Spin spinning={loading}>
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            overflowY: "auto",
            maxHeight: 500,
          }}
        >
          {todos.map((todo) => (
            <li
              key={todo.id}
              style={{
                background: "#fff",
                border: "1px solid #eee",
                padding: "8px 12px",
                borderRadius: 4,
                marginBottom: 8,
                boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
              }}
            >
              {todo.taskName}
            </li>
          ))}
        </ul>
      </Spin>
    </div>
  );
}

export default TodoApp;
