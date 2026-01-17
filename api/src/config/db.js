const mongoose = require("mongoose")

exports.connectDB = async (MONGO_URI) => {
    try {
        await mongoose.connect(MONGO_URI)
        console.log("connected to db")
    } catch (error) {
        console.error("mongodb connection error: ", error.message)
        process.exit(1)
    }
}