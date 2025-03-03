//zod input expect from the end user

const zod = require("zod");

const createtodo= zod.object({
    title: zod.string().min(1, "Title cannot be empty"),
    description: zod.string().min(1, "Description cannot be empty"),
});

const updatetodo= zod.object({
    id: zod.string(),
});

module.exports = {
    createtodo: createtodo,
    updatetodo: updatetodo,
};