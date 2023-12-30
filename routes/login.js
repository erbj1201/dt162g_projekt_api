const express = require("express");
const router = express.Router();
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const findUser = await userModel.findOne({ email });

        if (!findUser) {
            return res.json({ message: "Fel mejladress eller lösenord" });
        }

        const isPasswordValid = await bcrypt.compare(password, findUser.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Fel mejladress och/eller lösenord" });
        }

        const jwtToken = jwt.sign({ id: findUser._id }, process.env.JWT_SECRET);
        res.status(200).json({ message: "Välkommen", token: jwtToken });
    } catch (error) {
        console.error("Inloggningsfel:", error);
        res.status(500).json({ message: "Serverfel..." });
    }
});

module.exports = router;