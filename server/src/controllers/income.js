const express = require('express');
const Income = require('../models/income');
const User = require('../models/users');

const incomeRouter = express.Router();

incomeRouter.get('/', async (req, res) => {
  const incomes = await Income.find({}).populate('user', { username: 1 });
  res.json(incomes);
});

incomeRouter.post('/', async (req, res) => {
  const { amount, userId } = req.body;
  const user = await User.findById(userId);
  if (!user) return res.status(400).json({ error: 'Invalid user' });

  const income = new Income({ amount, user: user._id });
  const savedIncome = await income.save();

  user.income = savedIncome._id;
  await user.save();

  res.status(201).json(savedIncome);
});

incomeRouter.put('/:id', async (req, res) => {
  const { amount } = req.body;
  const updatedIncome = await Income.findByIdAndUpdate(
    req.params.id,
    { amount, updatedAt: Date.now() },
    { new: true }
  );
  res.json(updatedIncome);
});

incomeRouter.delete('/:id', async (req, res) => {
  const income = await Income.findByIdAndRemove(req.params.id);
  if (income) {
    await User.findByIdAndUpdate(income.user, { $unset: { income: '' } });
    res.status(204).end();
  } else {
    res.status(404).end();
  }
});

module.exports = incomeRouter;
