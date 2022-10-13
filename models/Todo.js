const mongoose = require("mongoose");

const todoSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        createdAt: String,
        updatedAt: String,
    },
    {
        timestamps: false,
    }
);

module.exports = mongoose.model("todos", todoSchema);
