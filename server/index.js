require('dotenv').config()

const express = require('express')
const app = express()
const cors = require("cors")
const axios = require("axios")

const port = 3000

app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello sdfadsf!')
})

app.get("/api", async (req, res) => {
    try {
        const response = await axios.get(`${process.env.BASE_URL}/movie/popular?api_key=${process.env.API_KEY}`)
        res.json(response.data.results)

    } catch (err) {
        console.error(err)
    }
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})

