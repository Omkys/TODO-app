import React from "react";

export default function Todos({ todos, onToggleTodo, onUndoTodo, onDeleteTodo }) {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Load your Todos:</h2>
      {todos.length === 0 ? (
        <p className="text-gray-500">No todos found.</p>
      ) : (
        todos.map((todo) => (
          <div
            key={todo._id}
            className={`border rounded-lg p-4 mb-4 shadow-sm flex justify-between items-start ${
              todo.completed ? "bg-green-100" : "bg-yellow-50"
            }`}
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{todo.title}</h3>
              <p className="text-gray-700">{todo.description}</p>
              <p className="text-sm text-gray-500 mt-1">
                Status: {todo.completed ? "✅ Completed" : "⏳ Pending"}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 mt-2 sm:mt-0 sm:ml-4">
              {!todo.completed ? (
                <button
                  className="bg-green-200 hover:bg-green-300 text-green-800 font-medium py-1 px-3 rounded transition"
                  onClick={() => onToggleTodo(todo._id)}
                >
                  Mark as Completed
                </button>
              ) : (
                <button
                  className="bg-yellow-200 hover:bg-yellow-300 text-yellow-800 font-medium py-1 px-3 rounded transition"
                  onClick={() => onUndoTodo(todo._id)}
                >
                  Undo
                </button>
              )}
              <button
                className="bg-red-200 hover:bg-red-300 text-red-800 font-medium py-1 px-3 rounded transition"
                onClick={() => onDeleteTodo(todo._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
