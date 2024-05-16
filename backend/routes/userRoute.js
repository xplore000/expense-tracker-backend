const express = require("express");
const { loginController, registerController } = require("../controllers/user");

//router object
const router = express.Router();

//routers
//post || login
router.post("/userLogin", loginController);

//post || register
router.post("/userRegister", registerController);

module.exports = router;
