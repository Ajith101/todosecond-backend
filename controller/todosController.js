const mongoose = require("mongoose");
const TodosModel = require("../models/todoModels");

const createATodo = async (req, res) => {
  const todos = req.body;

  const newTodo = new TodosModel({
    ...todos,
    added_on: new Date().toISOString(),
  });
  try {
    await newTodo.save();
    const total = await TodosModel.find().countDocuments({});
    res.status(201).json({ todo: newTodo, totalTodos: total });
  } catch (err) {
    res.status(404).json({ message: "Something went wrong" });

    console.log(err);
  }
};

const getAllTodos = async (req, res) => {
  const { page } = req.query;
  try {
    const limit = 6;
    const startIndex = (Number(page) - 1) * limit;
    const total = await TodosModel.countDocuments({});
    const todos = await TodosModel.find().limit(limit).skip(startIndex);

    res.json({
      data: todos,
      currentPage: Number(page),
      totalTodos: total,
      numberOfPages: Math.ceil(total / limit),
      limit: limit,
    });
  } catch (err) {
    res.status(404).json({ message: "Something Went Wrong" });
  }
};

const deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log(`Todo with ${id} not found`);
    }
    await TodosModel.findByIdAndDelete(id);
    const total = await TodosModel.find().countDocuments({});
    res.status(201).json({ message: "Delete succesfully ", totalTodo: total });
  } catch (err) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

const editeTodo = async (req, res) => {
  const { id } = req.params;
  const { todo } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log(`${id} with todo not exist`);
    }
    const editeTodo = { todo };
    await TodosModel.findByIdAndUpdate(id, editeTodo, { new: true });
    res.json(editeTodo);
  } catch (err) {
    res.status(404).json({ message: "Something went wrong" });
    console.log(err);
  }
};

const likeTodo = async (req, res) => {
  const { id } = req.params;
  console.log(req.body);
  const like = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log(`${id} with todo not found`);
    }
    await TodosModel.findByIdAndUpdate(id, like, { new: true });
    res.json(like);
  } catch (err) {
    res.status(404).json({ message: "something went wrong" });
  }
};

const geTSingleTodo = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log(`${id} with todo not found`);
    }
    const todo = await TodosModel.findById(id);
    res.status(200).json(todo);
  } catch (err) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

module.exports = {
  getAllTodos,
  createATodo,
  deleteTodo,
  editeTodo,
  likeTodo,
  geTSingleTodo,
};
