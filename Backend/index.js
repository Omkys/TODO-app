const express = require('express');
const { createtodo, updatetodo } = require('./types'); // createtodo and updatetodo are imported from types.js
const todo = require('./db');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Create a new todo
app.post('/todo', async (req, res) => {
    const createPayload = req.body;
    const parsedPayload = createtodo.safeParse(createPayload);

    if (!parsedPayload.success) {
        return res.status(411).json({ msg: "Invalid input" });
    }

    try {
        await todo.create({
            title: createPayload.title,
            description: createPayload.description,
            completed: false,
        });

        res.json({ msg: "Todo created successfully" });
    } catch (error) {
        console.error("Error creating todo:", error);
        res.status(500).json({ msg: "Internal server error" });
    }
});

// Get all todos
app.get("/todos", async (req, res) => {
    try {
        const todos = await todo.find({});
        res.json(todos);
    } catch (error) {
        console.error("Error fetching todos:", error);
        res.status(500).json({ msg: "Internal server error" });
    }
});

// Update a todo to completed
app.put('/completed', async (req, res) => {
    const updatePayload = req.body;
    const parsedPayload = updatetodo.safeParse(updatePayload);

    if (!parsedPayload.success) {
        return res.status(411).json({ msg: "Invalid input" });
    }

    try {
        const updatedTodo = await todo.findByIdAndUpdate(
            req.body.id,
            { completed: true },
            { new: true } // Return the updated document
        );

        if (!updatedTodo) {
            return res.status(404).json({ msg: "Todo not found" });
        }

        res.json({ msg: "Todo updated successfully", updatedTodo });
    } catch (error) {
        console.error("Error updating todo:", error);
        res.status(500).json({ msg: "Internal server error" });
    }
});

// Delete a todo by ID
app.delete('/todo/:id', async (req, res) => {
    const todoId = req.params.id;

    try {
        const deletedTodo = await todo.findByIdAndDelete(todoId);

        if (!deletedTodo) {
            return res.status(404).json({ msg: "Todo not found" });
        }

        res.json({ msg: "Todo deleted successfully" });
    } catch (error) {
        console.error("Error deleting todo:", error);
        res.status(500).json({ msg: "Internal server error" });
    }
});
// PUT /undo - mark todo as not completed
app.put('/undo', async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ msg: "ID is required" });
  }

  try {
    const updatedTodo = await todo.findByIdAndUpdate(
      id,
      { completed: false },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ msg: "Todo not found" });
    }

    res.json({ msg: "Todo marked as not completed", updatedTodo });
  } catch (error) {
    console.error("Error undoing todo:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
});

// Start the server
app.listen(3000, () => {
    console.log("Server started on port 3000");
});
