//Import
const express = require("express");
const router = express.Router();
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//POST to login user
router.post("/", async (req, res) => {
  //Get email and password from req body
  const { email, password } = req.body;
  //Find the user with given email in db
  try {
    const findUser = await userModel.findOne({ email });
    //If user not found, return message
    if (!findUser) {
      return res.json({ message: "Fel mejladress eller lösenord" });
    }
    //Compare password with hashed password
    const isPasswordValid = await bcrypt.compare(password, findUser.password);
    //if wrong password return message
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "Fel mejladress och/eller lösenord" });
    }
    //If ok, create token with jwt and return
    const jwtToken = jwt.sign({ id: findUser._id }, process.env.JWT_SECRET);
    res.status(200).json({ message: "Välkommen", token: jwtToken });
    //if server error, message
  } catch (error) {
    console.error("Inloggningsfel:", error);
    res.status(500).json({ message: "Serverfel..." });
  }
});
//export
module.exports = router;
