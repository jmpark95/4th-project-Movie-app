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

app.get("/api/nowplaying", async (req, res) => {
    try {
        const response = await axios.get(`${process.env.BASE_URL}/movie/now_playing?api_key=${process.env.API_KEY}`)
        res.json(response.data.results)

    } catch (err) {
        console.error(err)
    }
})

app.get("/api/genrelist", async (req, res) => {
    try {
        const response = await axios.get(`${process.env.BASE_URL}/genre/movie/list?api_key=${process.env.API_KEY}`)
        res.json(response.data.genres)
    } catch (err) {
        console.error(err)
    }
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
