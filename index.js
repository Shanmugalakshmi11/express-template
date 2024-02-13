const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// Zugriff auf Umgebungsvariablen
const { PORT } = process.env;

// Initialisierung von expres
const app = express();
app.use(bodyParser.json());
// Use for development
app.use(cors());
// Simulated database for todos
let todos = [
  { id: 1, task: "Complete project", completed: false },
  { id: 2, task: "Review code", completed: true },
  { id: 3, task: "QA", completed: true },
  { id: 4, task: "Developer Team", completed: false },
];
// Datenbank simulieren
let profiles = [
  {
    id: 1,
    firstName: "Max",
    name: "Mustermann",
    birthDate: new Date("1990-10-10"),
  },
  {
    id: 2,
    firstName: "Nina",
    name: "Mustermann",
    birthDate: new Date("1980-10-10"),
  },
];
// Get  Request
// Get all Profiles
app.get("/profiles", (req, res) => {
  res.json({ profiles });
});

// Return profile from a specific user
app.get("/profile", (req, res) => {
  const userId = parseInt(req.query.userId);
  const userProfile = profiles.find((item) => item.id === userId);
  res.json({ profile: userProfile });
});

// POST Request
app.post("/profile", (req, res) => {
  const newUser = req.body.user;

  profiles.push(newUser);

  res.json({ newProfile: newUser });
});

// PUT Request

app.put("/profile/add", (req, res) => {
  const { username, userId } = req.body;
  const currentUser = profiles.find((item) => item.id === userId);

  // Update the username if the user exists, otherwise return an error
  currentUser ? (currentUser.username = username) : res.status(404);

  res.json({ updatedProfile: currentUser });
});

// ***DELETE REQUESTS***
app.delete("/profile", (req, res) => {
  const userId = parseInt(req.query.userId);
  console.log(userId);
  // Create a new array without the profile to be deleted
  const updatedProfiles = profiles.filter((item) => item.id !== userId);

  // Update the global profiles array
  profiles = updatedProfiles;

  res.json({ deletedUserId: userId });
});

//POST todos
app.post("/todos", (req, res) => {
  const todosUser = req.body;

  todos.push(todosUser);

  res.json({ todotask: todosUser });
});
// Get all todos
app.get("/todos", (req, res) => {
  res.json({ todos });
});
// PUT Request

app.put("/todos/add", (req, res) => {
  const { todotask, userId } = req.body;
  const currenttask = todos.find((item) => item.id === userId);

  // Update the username if the user exists, otherwise return an error
  currenttask ? (currenttask.todotask = todotask) : res.status(404);

  res.json({ updatedProfile: currenttask });
});

// ***DELETE REQUESTS***
app.delete("/todos", (req, res) => {
  const userId = parseInt(req.query.userId);
  console.log(userId);
  // Create a new array without the profile to be deleted
  const updatedProfiles = todos.filter((item) => item.id !== userId);

  // Update the global profiles array
  todos = updatedProfiles;

  res.json({ deletedUserId: userId });
});

// Return todos from a specific id
app.get("/todos", (req, res) => {
  const todoId = parseInt(req.query.todoId);
  const todotask = todos.find((item) => item.id === todoId);
  res.json({ todotask: todotask });
});

// App hört im folgenden auf den Port, welcher über die Umgebungsvariable definiert ist
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
