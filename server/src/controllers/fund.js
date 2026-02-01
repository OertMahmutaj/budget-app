const express = require('express');
const Fund = require('../models/fund');
const User = require('../models/users');

const fundRouter = express.Router();

fundRouter.get('/', async (req, res) => {
  const funds = await Fund.find({}).populate('user', { username: 1 });
  res.json(funds);
});

fundRouter.post('/', async (req, res) => {
  const { amount, userId } = req.body;
  const user = await User.findById(userId);
  if (!user) return res.status(400).json({ error: 'Invalid user' });

  const fund = new Fund({ amount, user: user._id });
  const savedFund = await fund.save();

  user.fund = savedFund._id;
  await user.save();

  res.status(201).json(savedFund);
});

fundRouter.put('/:id', async (req, res) => {
  const { amount } = req.body;
  const updatedFund = await Fund.findByIdAndUpdate(
    req.params.id,
    { amount, updatedAt: Date.now() },
    { new: true }
  );
  res.json(updatedFund);
});

fundRouter.delete('/:id', async (req, res) => {
  const fund = await Fund.findByIdAndRemove(req.params.id);
  if (fund) {
    await User.findByIdAndUpdate(fund.user, { $unset: { fund: '' } });
    res.status(204).end();
  } else {
    res.status(404).end();
  }
});

module.exports = fundRouter;
