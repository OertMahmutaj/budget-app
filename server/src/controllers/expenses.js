const Expenses = require("../models/expenses");
const expensesRouter = require("express").Router();
const { userExtractor } = require("../utils/middleware");

expensesRouter.get("/", userExtractor, async (req, res) => {
  const expenses = await Expenses.find({ user: req.user._id });
  res.json(expenses);
});

expensesRouter.post("/", userExtractor, async (req, res) => {
  const { name, amount } = req.body;

  const expense = new Expenses({
    name,
    amount,
    user: req.user._id,
  });

  const savedExpense = await expense.save();
  req.user.expenses = req.user.expenses.concat(savedExpense._id);
  await req.user.save();

  res.status(201).json(savedExpense);
});

expensesRouter.put("/:id", userExtractor, async (req, res) => {
  const { name, amount } = req.body;

  const updatedExpense = await Expenses.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    { name, amount },
    { new: true, runValidators: true },
  );

  if (!updatedExpense) {
    return res.status(404).json({ error: "expense not found" });
  }

  res.json(updatedExpense);
});

expensesRouter.delete("/:id", userExtractor, async (req, res) => {
  const deletedExpense = await Expenses.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!deletedExpense) {
    return res.status(404).json({ error: "expense not found" });
  }

  res.status(204).end();
});

module.exports = expensesRouter;
