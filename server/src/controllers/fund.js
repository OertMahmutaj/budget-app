const Fund = require("../models/fund");
const fundRouter = require("express").Router();
const { userExtractor } = require("../utils/middleware");

fundRouter.get("/", userExtractor, async (req, res) => {
  const fund = await Fund.find({ user: req.user._id });
  res.json(fund);
});

fundRouter.post("/", userExtractor, async (req, res) => {
  const { name, amount } = req.body;

  const fund = new Fund({
    name,
    amount,
    user: req.user._id,
  });

  const savedFund = await fund.save();
  req.user.fund = savedFund._id;
  await req.user.save();

  res.status(201).json(savedFund);
});

fundRouter.put("/:id", userExtractor, async (req, res) => {
  const { name, amount } = req.body;

  const updatedFund = await Fund.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    { name, amount },
    { new: true, runValidators: true },
  );

  if (!updatedFund) return res.status(404).json({ error: "fund not found" });

  res.json(updatedFund);
});

fundRouter.delete("/:id", userExtractor, async (req, res) => {
  const deletedFund = await Fund.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!deletedFund) return res.status(404).json({ error: "fund not found" });

  res.status(204).end();
});

module.exports = fundRouter;
