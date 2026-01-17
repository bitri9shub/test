const { default: mongoose, Schema } = require("mongoose");

exports.sectionModel = mongoose.model("Section", new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    subsections: { type: [Schema.Types.ObjectId], ref: "SubSection" },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true }
}, {
    timestamps: true
}))