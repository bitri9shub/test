const { default: mongoose, Schema } = require("mongoose");

exports.chapterModel = mongoose.model("Chapter", new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    sections: { type: [Schema.Types.ObjectId], ref: "Section" },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true }
}, {
    timestamps: true
}))