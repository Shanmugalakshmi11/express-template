const { Router } = require("express");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const todoSequelize = require("../../database/setup/database");
const TodoModel = require("../../database/models/TodoModel");

// Simulated database for todos
let todos = [
  { id: 1, task: "Complete project", isDone: true, DueDate: "03.03.2024" },
  { id: 2, task: "Review code", isDone: false, DueDate: "03.10.2024" },
  { id: 3, task: "QA", isDone: true, DueDate: "23.02.2024" },
  { id: 4, task: "Developer Team", isDone: false, DueDate: "25.01.2024" },
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
  const { task, todosId, DueDate, isDone } = req.body;

  const currenttask = todos.find((item) => item.id === todosId);
  currenttask.task = task;
  currenttask.DueDate = DueDate;
  currenttask.isDone = isDone;
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
  const { id, isDone } = req.body;

  const todo = todos.find((item) => item.id == id);

  // setzt das zuvor definierte todo auf den neuen isDone WErt
  todo.isDone = isDone;

  // Todo rauslöschen
  const newTodos = todos.filter((item) => item.id != id);

  // Geupdatete Todo wieder hinzufügen
  newTodos.push(todo);

  todos = newTodos;

  res.status(StatusCodes.OK).json({ updatedTodo: todo });
});

// POST - /todos/create: Create todo
todosRouter.post("/create", async (req, res) => {
  const { newTask, newIsDone, newDueDate } = req.body;
  const newTodo = {
    task: newTask,
    isDone: newIsDone,
    DueDate: newDueDate,
  };

  todos.push(newTodo);
  const todo = await TodoModel.create(newTodo);
  res.status(StatusCodes.OK).json({ todo });
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
