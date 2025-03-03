export function Todos({ todos, onToggleTodo }) {
    return (
        <div>
            {todos.map(function(todo) {
                return (
                    <div key={todo._id}>

                        <h1>{todo.title}</h1>
                        <p>{todo.description}</p>
                        <button onClick={() => onToggleTodo(todo._id)}>

                            {todo.completed ? "Completed" : "Mark as completed"}
                        </button>
                    </div>
                );
            })}
        </div>
    );
}
