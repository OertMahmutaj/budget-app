const Income = require("../models/income");
const incomeRouter = require("express").Router();
const { userExtractor } = require("../utils/middleware");

incomeRouter.get("/", userExtractor, async (req, res) => {
  const incomes = await Income.find({ user: req.user._id });
  res.json(incomes);
});

incomeRouter.post("/", userExtractor, async (req, res) => {
  const { source, amount } = req.body;

  const income = new Income({
    source,
    amount,
    user: req.user._id,
  });

  const savedIncome = await income.save();
  req.user.income = savedIncome._id;
  await req.user.save();

  res.status(201).json(savedIncome);
});

incomeRouter.put("/:id", userExtractor, async (req, res) => {
  const { source, amount } = req.body;

  const updatedIncome = await Income.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    { source, amount },
    { new: true, runValidators: true },
  );

  if (!updatedIncome)
    return res.status(404).json({ error: "income not found" });

  res.json(updatedIncome);
});

incomeRouter.delete("/:id", userExtractor, async (req, res) => {
  const deletedIncome = await Income.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!deletedIncome)
    return res.status(404).json({ error: "income not found" });

  res.status(204).end();
});

module.exports = incomeRouter;
