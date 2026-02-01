const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  name: String,
  passwordHash: String,
  income: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Income",
  },
  expenses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Expenses",
    },
  ],
  fund: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Fund",
  },
  savings: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Savings",
  },
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
