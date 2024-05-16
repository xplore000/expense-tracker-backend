const incomeSchema = require("../models/incomeModel");
const Income = require('../models/incomeModel')
exports.addIncome = async (req, res) => {
  
    console.log(req.body);
    const { user_id, title, category, amount } = req.body;
  
    try {
      if (!user_id || !title || !category || !amount)
        return res.status(400).json({
          message: "User ID, title, category, and amount are required!",
        });
  
      const income = new Income({
        user_id,
        title,
        category,
        amount,
      });
  
      await income.save();
      res.status(200).json({ message: "Income added", income });
    } catch (error) {
      console.error("Error adding expense:", error);
      res.status(500).json({ message: "Server error" });
    }
  };
  exports.extraIncome = async (req, res) => {
  
    console.log(req.body);
    const { user_id, title, category, amount } = req.body;
  
    try {
      if (!user_id || !title || !category || !amount)
        return res.status(400).json({
          message: "User ID, title, category, and amount are required!",
        });
  
      const income = new Income({
        user_id,
        title,
        category,
        amount,
      });
  
      await income.save();
      res.status(200).json({ message: "Extra Income added", income });
    } catch (error) {
      console.error("Error adding expense:", error);
      res.status(500).json({ message: "Server error" });
    }
  };


  exports.editIncome = async (req, res) => {
    const { id } = req.params;
    const { user_id, title, category, amount } = req.body;
  
    try {
      // Check if all required fields are provided
      if (!user_id || !title || !category || !amount)
        return res.status(400).json({ message: "User ID, title, category, and amount are required!" });
  
      // Find the income record by ID
      const income = await Income.findById(id);
      if (!income)
        return res.status(404).json({ message: "Income not found" });
  
      // Update the income record with the provided data
      income.user_id = user_id;
      income.title = title;
      income.category = category;
      income.amount = amount;
  
      // Save the updated income record
      await income.save();
      
      // Send a success response
      res.status(200).json({ message: "Income updated", income });
    } catch (error) {
      console.error("Error editing income:", error);
      res.status(500).json({ message: "Server error" });
    }
  };



exports.getIncome = async (req, res) => {
    try {
      const userId = req.query.user_id;
        const incomes = await incomeSchema.find({user_id: userId}).sort({ createdAt: -1 });
        res.status(200).json({ incomes });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

exports.deleteIncome = async (req, res) => {
    const { id } = req.params;
    console.log(req.params)
    try {
        const income = await incomeSchema.findByIdAndDelete(id);
        if (!income)
            return res.status(404).json({ message: "Income not found" });
        res.status(200).json({ message: "Income deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
