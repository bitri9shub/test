const { default: mongoose, Schema } = require("mongoose");

exports.subSectionModel = mongoose.model("SubSection", new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    content: String,
    author: { type: Schema.Types.ObjectId, ref: "User", required: true }
}, {
    timestamps: true
}))