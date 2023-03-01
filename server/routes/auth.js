const router = require("express").Router();
const axios = require("axios");
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//Register
router.post("/register", async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString(),
    });
    try {
        const user = await newUser.save();

        const accessToken = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: "1d" })

        const { password, ...userInfo } = user._doc

        res.status(201).json({ ...userInfo, accessToken });
    } catch (err) {
        res.status(500).json(err)
    }
});

//Login
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username })
        if (!user) {
            return res.status(401).json("Invalid credentials")
        }

        const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
        const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
        if (req.body.password !== originalPassword) {
            return res.status(401).json("Wrong password")
        }

        const accessToken = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: "1d" })

        const { password, ...userInfo } = user._doc

        res.status(200).json({ ...userInfo, accessToken })
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router;
