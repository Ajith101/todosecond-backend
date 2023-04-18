const mongoose = require("mongoose");

const TodosScheema = new mongoose.Schema({
  todo: String,
  added_on: { type: Date, default: new Date() },
  like: { type: Boolean, default: false },
});

const todos = mongoose.model("todo", TodosScheema);

module.exports = todos;
