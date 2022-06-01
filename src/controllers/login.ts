import express from "express";
import bcrypt from "bcrypt";
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");

router.post("/", async (_req, res) => {
    const { userName, password } = {
        userName: _req.body.userName,
        password: _req.body.password,
    };
    
    const user = await User.findOne({ userName });
    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(password, user.password);
    
    if (!(user && passwordCorrect)) {
        res.status(401).json({
            success: false,
            error: "Usuario o contraseña incorrectos",
        });
    } else {
        const token = jwt.sign({
            userName,
            id: user._id,
        }, "luis", {
            expiresIn: "7d"
        });

        res.status(200).json({
            success: true,
            user: {
                userName: userName,
                token
            }
        });
    }
});

module.exports = router;