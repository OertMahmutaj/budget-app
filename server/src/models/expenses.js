const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: Number, default: 0 },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },   
  updatedAt: { type: Date },                      
  deletedAt: { type: Date },                      
});



blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Expenses = mongoose.model("Expenses", ExpenseSchema);

module.exports = Expenses;
