const { Router } = require("express");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const todoSequelize = require("../../database/setup/database");
const TodoModel = require("../../database/models/TodoModel");
const { where } = require("sequelize");

// Simulated database for todos
let todos = [
  {
    id: 1,
    userId: 1,
    task: "Complete project",
    isDone: true,
    DueDate: "03.03.2024",
  },
  {
    id: 2,
    userId: 1,
    task: "Review code",
    isDone: false,
    DueDate: "03.10.2024",
  },
  { id: 3, userId: 2, task: "QA", isDone: true, DueDate: "23.02.2024" },
  {
    id: 4,
    userId: 2,
    task: "Developer Team",
    isDone: false,
    DueDate: "25.01.2024",
  },
];

console.log(todos);
const todosRouter = Router();

// GET - /todos/all: Return all todos
todosRouter.get("/all", async (req, res) => {
  const todos = await TodoModel.findAll();
  res.status(StatusCodes.OK).send(todos);
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
todosRouter.put("/update", async (req, res) => {
  const { newTask, todoId, newDueDate, newIsDone, userId } = req.body;
  const todos = await TodoModel.update(
    {
      task: newTask,
      isDone: newIsDone,
      DueDate: newDueDate,
      userid: userId,
    },
    { where: { id: todoId } }
  );
  const todo = await TodoModel.findByPk(todoId);
  res.status(StatusCodes.OK).json({ updatedTodos: todo });
});

//  ***DELETE REQUESTS***
todosRouter.delete("/delete", async (req, res) => {
  const { todoId } = req.body;
  await TodoModel.destroy({ where: { id: todoId } });

  res.status(StatusCodes.OK).json({ DeletedTodos: todoId });
});

// PUT - /todos/mark: Mark todo completed
// PUT REQUESTS
todosRouter.put("/mark", async (req, res) => {
  const { todoId, newIsDone } = req.body;

  await TodoModel.findByPk(todoId)
    .then((todo) => {
      // Check if the todo exists
      if (!todo) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ error: "Todo not found" });
      }

      // Update the isDone property
      todo.isDone = newIsDone;

      // Save the changes
      return todo.save();
    })
    .then((updatedTodo) => {
      // Return the updated todo in the response
      res.status(StatusCodes.OK).json({ updatedTodo });
    })
    .catch((error) => {
      console.error("Error marking todo as done:", error);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: "Internal Server Error" });
    });
});

// POST - /todos/create: Create todo
todosRouter.post("/create", async (req, res) => {
  const { newTask, newIsDone, newDueDate, userId } = req.body;
  const newTodo = {
    task: newTask,
    isDone: newIsDone,
    DueDate: newDueDate,
    userid: userId,
  };

  todos.push(newTodo);
  const todo = await TodoModel.create(newTodo);
  res.status(StatusCodes.OK).json({ todo });
});

// GET - /todos/byuserid: All todos from a user
todosRouter.get("/byid", async (req, res) => {
  const todoid = req.query.todoid;

  if (!todoid) {
    res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
    return;
  }
  const todo = await TodoModel.findOne({ where: { id: todoid } });
  res.status(StatusCodes.OK).json({ todo: todo });
});

// GET - /todos/byuserid: All todos from a user
todosRouter.get("/byuserid", async (req, res) => {
  const userid = req.query.userid;

  if (!userid) {
    res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
    return;
  }
  const todo = await TodoModel.findOne({ where: { userid: userid } });
  res.status(StatusCodes.OK).json({ todo: todo });
});
module.exports = { todosRouter };
