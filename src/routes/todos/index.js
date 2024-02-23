const { Router } = require("express");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");

// Simulated database for todos
let todos = [
  { id: 1, task: "Complete project", completed: true, DueDate: "03.03.2024" },
  { id: 2, task: "Review code", completed: false, DueDate: "03.10.2024" },
  { id: 3, task: "QA", completed: true, DueDate: "23.02.2024" },
  { id: 4, task: "Developer Team", completed: false, DueDate: "25.01.2024" },
];

console.log(todos);
const todosRouter = Router();

// GET - /todos/all: Return all todos
todosRouter.get("/all", (req, res) => {
  res.json({ todos });
});
//  ***GET REQUESTS***
// Return todos from a specific user
todosRouter.get("/id", (req, res) => {
  const todosId = parseInt(req.query.todosId);
  if (!todosId) {
    res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
    return;
  }
  const usertodos = todos.find((item) => item.id === todosId);
  res.status(StatusCodes.OK).json({ todos: usertodos });
});

//  ***PUT REQUESTS***
todosRouter.put("/update", (req, res) => {
  const { task, todosId, DueDate, completed } = req.body;

  const currenttask = todos.find((item) => item.id === todosId);
  currenttask.task = task;
  currenttask.DueDate = DueDate;
  currenttask.completed = completed;
  const updatedTodo = todos.filter((item) => item.id !== todosId);
  updatedTodo.push(currenttask);

  todos = updatedTodo;

  res.json({ updatedTodo: currenttask });
});

//  ***DELETE REQUESTS***
todosRouter.delete("/delete", (req, res) => {
  const { todosId } = req.body;
  console.log(req.body);
  const remainingProfiles = todos.filter((item) => item.id !== todosId);
  console.log(todosId);
  console.log(remainingProfiles);
  todos = remainingProfiles;
  console.log(todos);
  console.log("This is deletion");

  res.json({ deletedUserId: todosId });
});

// PUT - /todos/mark: Mark todo completed
// PUT REQUESTS
todosRouter.put("/mark", (req, res) => {
  const { id, completed } = req.body;

  const todo = todos.find((item) => item.id == id);

  // setzt das zuvor definierte todo auf den neuen isDone WErt
  todo.completed = completed;

  // Todo rauslöschen
  const newTodos = todos.filter((item) => item.id != id);

  // Geupdatete Todo wieder hinzufügen
  newTodos.push(todo);

  todos = newTodos;

  res.status(StatusCodes.OK).json({ updatedTodo: todo });
});

// POST - /todos/create: Create todo
todosRouter.post("/create", (req, res) => {
  const { newTask, newCompleted, newDueDate } = req.body;
  const newTodo = {
    id: todos.length + 1,
    task: newTask,
    completed: newCompleted,
    DueDate: newDueDate,
  };

  todos.push(newTodo);
  res.status(StatusCodes.OK).json({ todo: newTodo });
});

// GET - /todos/byuserid: All todos from a user
todosRouter.get("/byuserid", (req, res) => {
  const todosId = parseInt(req.query.todosId);
  if (!todosId) {
    res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
    return;
  }
  const usertodos = todos.find((item) => item.id === todosId);
  res.status(StatusCodes.OK).json({ todos: usertodos });
});

module.exports = { todosRouter };
