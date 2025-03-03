const mongoose = require("mongoose");
//url pahije to connect to the database from mongodb compass
mongoose.connect("mongodb+srv://Omky17:_pwY.evzT3_YZiC@cluster0.mgy21.mongodb.net/",)

.then(() => console.log("Connected to MongoDB"))
.catch(err => console.log(err.message));

const todoschema = mongoose.Schema({
    title: String,
    description: String,
    completed: {
        type: Boolean,
        default: false
    }, //=>boolean value to check if the task is completed or not(yes or no)
});

const todo = mongoose.model("todo", todoschema);

module.exports = todo;