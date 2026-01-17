const { chapterModel } = require("../models/chapter.model")
const mongoose = require('mongoose')

exports.getChapters = async (req, res) => {
    try {
        const chapters = await chapterModel.find().lean()
        return res.status(200).json({
            success: true,
            payload: chapters,
            count: chapters.length
        })
    } catch (error) {
        console.error("Error getting chapters: ", error.message)
        return res.status(500).json({
            success: false,
            message: "Error getting chapters"
        })
    }
}

exports.getChapterById = async (req, res) => {
    try {
        const { id } = req.params
        const chapter = await chapterModel.findById(id).lean()
        if (!chapter) return res.status(404).json({
            success: false,
            message: "Chapter not found"
        })
        return res.status(200).json({
            success: true,
            payload: chapter
        })
    } catch (error) {
        console.error("Error getting chapter: ", error.message)
        return res.status(500).json({
            success: false,
            message: "Error getting chapter by id"
        })
    }
}

exports.createChapter = async (req, res) => {
    try {
        const { title, description } = req.body
        if (!title || !description) return res.status(400).json({
            success: false,
            message: "Title and description are required"
        })
        const chapter = await chapterModel.create({
            title,
            description,
            sections: [],
            author: new mongoose.Types.ObjectId() // retrieve user id later, when auth is created
        })
        return res.status(201).json({
            success: true,
            message: "Chapter created successfully",
            payload: chapter
        })
    } catch (error) {
        console.error("Error creating chapter:", error.message)
        return res.status(500).json({
            success: false,
            message: "Error creating chapter"
        })
    }
}

exports.updateChapterById = async (req, res) => {
    try {
        const { title, description } = req.body
        if (!title || !description) return res.status(400).json({
            success: false,
            message: "Title and description are required"
        })
        const { id } = req.params
        const chapter = await chapterModel.findByIdAndUpdate(id,
            { title, description },
            { new: true, runValidators: true }
        ).lean()

        if (!chapter) return res.status(404).json({
            success: false,
            message: "Chapter not found"
        })

        return res.status(200).json({
            success: true,
            message: "Chapter updated successfully",
            payload: chapter
        })
    } catch (error) {
        console.error("Error updating chapter:", error.message)
        return res.status(500).json({
            success: false,
            message: "Error updating chapter by id"
        })
    }
}

exports.deleteChapterById = async (req, res) => {
    try {
        const { id } = req.params
        const deletedChapter = await chapterModel.findByIdAndDelete(id)
        if (!deletedChapter) {
            return res.status(404).json({
                success: false,
                message: "Chapter not found"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Chapter deleted successfully"
        })
    } catch (error) {
        console.error("Error deleting chapter:", error.message)
        return res.status(500).json({
            success: false,
            message: "Error deleting chapter by id"
        })
    }
}