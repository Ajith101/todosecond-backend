const express = require("express");
const {
  getAllTodos,
  createATodo,
  deleteTodo,
  editeTodo,
  likeTodo,
  geTSingleTodo,
} = require("../controller/todosController");
const router = express.Router();

router.get("/", getAllTodos);
router.get("/single/:id", geTSingleTodo);
router.post("/", createATodo);
router.delete("/:id", deleteTodo);
router.patch("/:id", editeTodo);
router.patch("/like/:id", likeTodo);

module.exports = router;
