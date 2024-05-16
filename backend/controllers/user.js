const userModel = require("../models/userModel");

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("output = ", req.body);
    const user = await userModel.findOne({ email, password });
    if (!user) {
      console.log("no user");
      return res.status(404).send("user not found");
    }
    res.status(200).json({ sucess: true, user });
    console.log("test");
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
};

//register callback
const registerController = async (req, res) => {
  try {
    const newUser = new userModel(req.body);
    await newUser.save();

    res.status(201).json({ sucess: true, newUser });
  } catch (error) {
    res.status(400).json({ sucess: false, error });
  }
};

module.exports = { loginController, registerController };