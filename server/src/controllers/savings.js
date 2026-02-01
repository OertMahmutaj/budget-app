const express = require('express');
const Savings = require('../models/savings');
const User = require('../models/user');

const savingsRouter = express.Router();

savingsRouter.get('/', async (req, res) => {
  const savings = await Savings.find({}).populate('user', { username: 1 });
  res.json(savings);
});

savingsRouter.post('/', async (req, res) => {
  const { amount, userId } = req.body;
  const user = await User.findById(userId);
  if (!user) return res.status(400).json({ error: 'Invalid user' });

  const saving = new Savings({ amount, user: user._id });
  const savedSaving = await saving.save();

  user.savings = savedSaving._id;
  await user.save();

  res.status(201).json(savedSaving);
});

savingsRouter.put('/:id', async (req, res) => {
  const { amount } = req.body;
  const updatedSaving = await Savings.findByIdAndUpdate(
    req.params.id,
    { amount, updatedAt: Date.now() },
    { new: true }
  );
  res.json(updatedSaving);
});

savingsRouter.delete('/:id', async (req, res) => {
  const saving = await Savings.findByIdAndRemove(req.params.id);
  if (saving) {
    await User.findByIdAndUpdate(saving.user, { $unset: { savings: '' } });
    res.status(204).end();
  } else {
    res.status(404).end();
  }
});

module.exports = savingsRouter;
