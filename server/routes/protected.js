const router = require("express").Router();
const axios = require("axios");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

//Get user's saved watchlist
router.get("/favourites", async (req, res) => {
    const { authorization } = req.headers
    if (!authorization) {
        return res.status(401).json({ error: "authorization token required" })
    }
    const token = authorization.split(' ')[1]
    try {
        const { id } = jwt.verify(token, process.env.SECRET_KEY)
        const user = await User.findOne({ _id: id })
        const { watchlist } = user
        res.json(watchlist)
    } catch (err) {
        res.status(401).json({ error: "request is not authorized" })
    }
})

//Add new movie to user's watchlist
router.post("/add", async (req, res) => {
    const { authorization } = req.headers
    if (!authorization) {
        return res.status(401).json({ error: "authorization token required" })
    }
    const token = authorization.split(' ')[1]
    try {
        const { id } = jwt.verify(token, process.env.SECRET_KEY)
        const doc = await User.findOne({ _id: id })
        doc.watchlist.push(req.body.title)
        const newDoc = await doc.save();
        res.json(newDoc)
    } catch (err) {
        res.status(401).json({ error: "request is not authorized" })
    }
})

//Remove movie from watchlist
router.delete("/delete", async (req, res) => {
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({ error: "authorization token required" })
    }

    const token = authorization.split(' ')[1]
    try {
        const { id } = jwt.verify(token, process.env.SECRET_KEY)
        const doc = await User.findOne({ _id: id })

        const index = doc.watchlist.indexOf(req.body.title.title)
        if (index !== -1) {
            doc.watchlist.splice(index, 1);
        }

        const newDoc = await doc.save();
        res.json(newDoc)
    } catch (err) {
        res.status(401).json({ error: "request is not authorized" })
    }
})

module.exports = router