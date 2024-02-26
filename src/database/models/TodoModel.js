const { DataTypes } = require("sequelize");
const todoSequelize = require("../setup/database");

// Define the Todo model
const TodoModel = todoSequelize.define(
  "Todo",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    task: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isDone: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    DueDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  { tableName: "Todos" }
);

module.exports = TodoModel;
