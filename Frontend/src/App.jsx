// src/App.jsx
import { useState } from "react";
import { CreateTodo } from "./components/CreateTodo";
import Todos from "./components/Todos";
import Footer from "./components/Footer";
import Feedback from "./components/Feedback";

function App() {
  const [todos, setTodos] = useState([]);
  const [showTodos, setShowTodos] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);

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

  const onToggleTodo = async (id) => {
    try {
      const response = await fetch("http://localhost:3000/completed", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) throw new Error("Failed to update todo");
      await response.json();

      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === id ? { ...todo, completed: true } : todo
        )
      );
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const onUndoTodo = async (id) => {
    try {
      const response = await fetch("http://localhost:3000/undo", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) throw new Error("Failed to undo todo");
      await response.json();

      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === id ? { ...todo, completed: false } : todo
        )
      );
    } catch (error) {
      console.error("Error undoing todo:", error);
    }
  };

  const onDeleteTodo = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/todo/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete todo");

      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div className="min-h-screen bg-sky-50 relative flex flex-col">
      {/* Header: Load Todos + CreateTodo + Search */}
      <header className="flex flex-wrap md:flex-nowrap items-center justify-between bg-blue-200 p-4 shadow-md gap-4">
        <div className="flex items-center gap-4 flex-wrap">
          <button
            onClick={fetchTodos}
            className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-5 py-2 rounded-md shadow-md transition"
            aria-label="Load todos"
          >
            Load Todos
          </button>
          <CreateTodo />
        </div>

        <input
          type="search"
          placeholder="Search todos..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="bg-white w-full max-w-xs md:max-w-sm border border-gray-300 rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
          aria-label="Search todos"
        />
      </header>

      {/* Todo list */}
      <main className="flex-grow px-4 py-6 max-w-4xl mx-auto w-full">
        {showTodos && (
          <Todos
            todos={todos.filter(
              (todo) =>
                todo.title.toLowerCase().includes(searchText.toLowerCase()) ||
                todo.description?.toLowerCase().includes(searchText.toLowerCase())
            )}
            onToggleTodo={onToggleTodo}
            onUndoTodo={onUndoTodo}
            onDeleteTodo={onDeleteTodo}
          />
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Dancing Feedback Button */}
      <button
        onClick={() => setShowFeedbackForm(true)}
        className="fixed bottom-6 left-6 bg-yellow-400 text-white px-5 py-3 rounded-full shadow-lg animate-bounce hover:bg-yellow-500 transition z-50 select-none"
        aria-label="Open feedback form"
      >
        💬 Feedback
      </button>

      {/* Feedback Modal */}
      {showFeedbackForm && <Feedback onClose={() => setShowFeedbackForm(false)} />}
    </div>
  );
}

export default App;
