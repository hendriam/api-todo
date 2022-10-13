module.exports = (app) => {
    const TodoController = require("../controllers/TodoController.js");

    app.get("/todo", TodoController.getAll);
    app.get("/todo/:id", TodoController.getOne);
    app.post("/todo/create", TodoController.create);
    app.put("/todo/update/:id", TodoController.update);
    app.delete("/todo/delete/:id", TodoController.delete);
};
