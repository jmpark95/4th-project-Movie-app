require('dotenv').config()

const express = require('express')
const app = express()
const cors = require("cors")
const axios = require("axios")

const port = 3000

app.use(cors())

app.get('/', (req, res) => {
    res.send('index route')
})

app.get("/api/genrelist", async (req, res) => {
    try {
        const response = await axios.get(`${process.env.BASE_URL}/genre/movie/list?api_key=${process.env.API_KEY}`)
        res.json(response.data.genres)
    } catch (err) {
        console.error(err)
    }
})

app.get("/api/nowplaying/:page", async (req, res) => {
    try {
        const response = await axios.get(`${process.env.BASE_URL}/movie/now_playing?api_key=${process.env.API_KEY}&language=en-US&page=${req.params.page}`)
        res.json(response.data)

    } catch (err) {
        console.error(err)
    }
})

app.get("/api/top-rated/:page", async (req, res) => {
    try {
        const response = await axios.get(`${process.env.BASE_URL}/movie/top_rated?api_key=${process.env.API_KEY}&language=en-US&page=${req.params.page}`)
        res.json(response.data)

    } catch (err) {
        console.error(err)
    }
})

app.get("/api/search/:query/:page", async (req, res) => {
    try {
        const response = await axios.get(`${process.env.BASE_URL}/search/movie?api_key=${process.env.API_KEY}&query=${req.params.query}&page=${req.params.page}`)
        res.json(response.data)

    } catch (err) {
        console.error(err)
    }
})





app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
