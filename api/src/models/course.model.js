const { default: mongoose, Schema } = require("mongoose");

exports.courseModel = mongoose.model("Course", new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    chapters: { type: [Schema.Types.ObjectId], ref: "Chapter" },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    themes: [String],
    media: String,
    published: Boolean
}, {
    timestamps: true
}))