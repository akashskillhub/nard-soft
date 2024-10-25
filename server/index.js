const express = require("express")
const cors = require("cors")
require("dotenv").config({ path: "./.env" })


const app = express()

app.use(express.json()) // body parser
app.use(cors({
    origin: process.env.NODE_ENV === "dev" ? "http://localhost:5173" : "",
}))

// routes
app.use("/api/admin", require("./routes/admin.routes"))

// 404
app.use("*", (req, res) => {
    // res.sendFile(path.join(__dirname, "dist", "index.html"))
    res.status(404).json({ message: "Resource not found" })
})

// error handler
app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({ message: err.message || "something went wrong" })
})


// server
mongoose.connect(process.env.MONGO_URL)
mongoose.connection.once("open", () => {
    console.log("MONGO DB CONNECTED")
    app.listen(process.env.PORT, console.log(`SERVER RUNNING: http://localhost:${process.env.PORT}`))
})