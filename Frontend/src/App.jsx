import { useState } from "react";
import "./App.css";
import { CreateTodo } from "./components/CreateTodo";
import { Todos } from "./components/todos";

function App() {
  const [todos, setTodos] = useState([]);
  const [showTodos, setShowTodos] = useState(true); // State for toggling todos visibility

  // Fetch Todos manually (on button click)
  const fetchTodos = async () => {
    try {
      const res = await fetch("http://localhost:3000/todos");
      if (!res.ok) throw new Error("Network response was not ok");

      const json = await res.json();
      setTodos(json);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  // Toggle Todo Completion
  const onToggleTodo = async (id) => {
    try {
      const response = await fetch("http://localhost:3000/completed", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) throw new Error("Failed to update todo");

      const updatedTodo = await response.json(); // Ensure server returns updated data

      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === id ? { ...todo, completed: updatedTodo.completed } : todo
        )
      );
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  // Toggle visibility of todos
  const toggleTodosVisibility = () => {
    setShowTodos((prev) => !prev);
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: '10px',
        backgroundColor: 'lightblue', padding: '10px'
       }}>
        <button style={{ padding: "10px", margin: "10px", 
          backgroundColor: "lightgoldenrodyellow"
        }} onClick={fetchTodos}>Load Todos</button>
        <CreateTodo />
      </div>
      {showTodos && <Todos todos={todos} onToggleTodo={onToggleTodo} />}
    </div>
  );
}

export default App;
