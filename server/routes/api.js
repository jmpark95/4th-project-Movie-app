const router = require("express").Router();
const axios = require("axios");

router.get("/genrelist", async (req, res) => {
    try {
        const response = await axios.get(`${process.env.BASE_URL}/genre/movie/list?api_key=${process.env.API_KEY}`)
        res.json(response.data.genres)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.get("/nowplaying/:page", async (req, res) => {
    try {
        const response = await axios.get(`${process.env.BASE_URL}/movie/now_playing?api_key=${process.env.API_KEY}&language=en-US&page=${req.params.page}`)
        res.json(response.data)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.get("/top-rated/:page", async (req, res) => {
    try {
        const response = await axios.get(`${process.env.BASE_URL}/movie/top_rated?api_key=${process.env.API_KEY}&language=en-US&page=${req.params.page}`)
        res.json(response.data)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.get("/search/:query/:page", async (req, res) => {
    try {
        const response = await axios.get(`${process.env.BASE_URL}/search/movie?api_key=${process.env.API_KEY}&query=${req.params.query}&page=${req.params.page}`)
        res.json(response.data)
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router