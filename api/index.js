require("dotenv").config()
const express = require('express')

const { connectDB } = require("./src/config/db")

const chapterRouter = require("./src/routers/chapter.router")
const courseRouter = require("./src/routers/course.router")
const sectionRouter = require("./src/routers/section.router")

const app = express()

const port = process.env.PORT
const MONGO_URI = process.env.MONGO_URI

app.use(express.json())

app.use('/chapter', chapterRouter)
app.use('/course', courseRouter)
app.use('/section', sectionRouter)

app.listen(port, () => {
    connectDB(MONGO_URI)
    console.log(`app listening on port ${port}`)
})
