const Savings = require("../models/savings");
const savingsRouter = require("express").Router();
const { userExtractor } = require("../utils/middleware");

savingsRouter.get("/", userExtractor, async (req, res) => {
  const savings = await Savings.find({ user: req.user._id });
  res.json(savings);
});

savingsRouter.post("/", userExtractor, async (req, res) => {
  const { name, amount } = req.body;

  const savings = new Savings({
    name,
    amount,
    user: req.user._id,
  });

  const savedSavings = await savings.save();
  req.user.savings = savedSavings._id;
  await req.user.save();

  res.status(201).json(savedSavings);
});

savingsRouter.put("/:id", userExtractor, async (req, res) => {
  const { name, amount } = req.body;

  const updatedSavings = await Savings.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    { name, amount },
    { new: true, runValidators: true },
  );

  if (!updatedSavings)
    return res.status(404).json({ error: "savings not found" });

  res.json(updatedSavings);
});

savingsRouter.delete("/:id", userExtractor, async (req, res) => {
  const deletedSavings = await Savings.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!deletedSavings)
    return res.status(404).json({ error: "savings not found" });

  res.status(204).end();
});

module.exports = savingsRouter;
