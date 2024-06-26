const expenseSchema = require("../models/expenseModel");
const Expense = require("../models/expenseModel");

exports.addExpense = async (req, res) => {
  console.log(req.body);
  const { user_id, title, category, amount,bill_name } = req.body;

  try {
    if (!user_id || !title || !category || !amount)
      return res.status(400).json({
        message: "User ID, title, category, and amount are required!",
      });

    const expense = new Expense({
      user_id,
      title,
      category,
      amount,
      bill_name
    });

    await expense.save();
    res.status(200).json({ message: "Expense added", expense });
  } catch (error) {
    console.error("Error adding expense:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getExpense = async (req, res) => {
  try {
    const userId = req.query.user_id; // Assuming the user_id is provided as a query parameter
    const expenses = await expenseSchema
      .find({ user_id: userId })
      .sort({ createdAt: -1 });
    res.status(200).json({ expenses });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteExpense = async (req, res) => {
  const { id } = req.params;
  console.log(req.params);
  try {
    const expense = await expenseSchema.findByIdAndDelete(id);
    if (!expense) return res.status(404).json({ message: "Expense not found" });
    res.status(200).json({ message: "Expense deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};