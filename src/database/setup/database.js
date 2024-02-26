const { Sequelize } = require("sequelize");

// Connect to MySQL using Sequelize
const todoSequelize = new Sequelize("todos_app", "root", "12345", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = todoSequelize;
