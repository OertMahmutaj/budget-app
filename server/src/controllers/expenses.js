const express = require('express');
const Expense = require('../models/expenses');
const User = require('../models/users');

const expensesRouter = express.Router();

expensesRouter.get('/', async (req, res) => {
  const expenses = await Expense.find({}).populate('user', { username: 1, name: 1 });
  res.json(expenses);
});

expensesRouter.get('/:id', async (req, res) => {
  const expense = await Expense.findById(req.params.id).populate('user', { username: 1, name: 1 });
  if (expense) res.json(expense);
  else res.status(404).end();
});

expensesRouter.post('/', async (req, res) => {
  const { name, amount, userId } = req.body;

  const user = await User.findById(userId);
  if (!user) return res.status(400).json({ error: 'Invalid user' });

  const expense = new Expense({ name, amount, user: user._id });
  const savedExpense = await expense.save();

  user.expenses = user.expenses.concat(savedExpense._id);
  await user.save();

  res.status(201).json(savedExpense);
});

expensesRouter.put('/:id', async (req, res) => {
  const { name, amount } = req.body;
  const updatedExpense = await Expense.findByIdAndUpdate(
    req.params.id,
    { name, amount, updatedAt: Date.now() },
    { new: true }
  );
  res.json(updatedExpense);
});

expensesRouter.delete('/:id', async (req, res) => {
  const expense = await Expense.findByIdAndRemove(req.params.id);
  if (expense) {
    await User.findByIdAndUpdate(expense.user, { $pull: { expenses: expense._id } });
    res.status(204).end();
  } else {
    res.status(404).end();
  }
});

module.exports = expensesRouter;
