require('dotenv').config()
const express = require('express')
const app = express()
const cors = require("cors")
const mongoose = require('mongoose');
const PORT = 3000
const path = require('path');
const apiRouter = require("./routes/api")
const authRouter = require("./routes/auth")
const protectedRouter = require("./routes/protected")


//mongo connection
async function main() {
    await mongoose.connect(process.env.MONGO_URI);
}
mongoose.set("strictQuery", false);
main()
    .then(() => { console.log("Connected to database") })
    .catch(err => console.log(err));

//app
app.use(express.static(path.join(__dirname, 'dist')));
app.use(cors());
app.use(express.json());

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});
app.use("/api", apiRouter)
app.use("/auth", authRouter)
app.use("/protected", protectedRouter)

app.listen(process.env.PORT || PORT, () => {
    console.log(`App listening on port ${PORT}`)
})
