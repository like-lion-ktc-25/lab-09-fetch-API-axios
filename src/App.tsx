import { useState } from "react";
import TodoApp from "./components/todoApp";
import ProductApp from "./components/productsApp";

function App() {
  const [activeApp, setActiveApp] = useState<"todo" | "product">("todo");

  return (
    <div style={{ padding: 10 }}>
      <h1 style={{ marginBottom: 16 }}>Lab 09</h1>

      <div style={{ display: "flex", gap: 8 }}>
        <button
          onClick={() => setActiveApp("todo")}
          style={{
            padding: "8px 12px",
            background: activeApp === "todo" ? "#007bff" : "#6c757d",
            color: "white",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          Todo List App
        </button>
        <button
          onClick={() => setActiveApp("product")}
          style={{
            padding: "8px 12px",
            background: activeApp === "product" ? "#007bff" : "#6c757d",
            color: "white",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          Product Management App
        </button>
      </div>

      <div style={{ marginTop: 20 }}>
        {activeApp === "todo" && <TodoApp />}
        {activeApp === "product" && <ProductApp />}
      </div>
    </div>
  );
}

export default App;
