const { sectionModel } = require('../models/section.model')
const mongoose = require('mongoose')

exports.getSections = async (req, res) => {
    try {
        const sections = await sectionModel.find().lean()
        return res.status(200).json({
            success: true,
            payload: sections,
            count: sections.length
        })
    } catch (error) {
        console.error("Error getting sections: ", error.message)
        return res.status(500).json({
            success: false,
            message: "Error getting sections"
        })
    }
}

exports.getSectionById = async (req, res) => {
    try {
        const { id } = req.params
        const section = await sectionModel.findById(id).lean()
        if (!section) return res.status(404).json({
            success: false,
            message: "Section not found"
        })
        return res.status(200).json({
            success: true,
            payload: section
        })
    } catch (error) {
        console.error("Error getting section: ", error.message)
        return res.status(500).json({
            success: false,
            message: "Error getting section by id"
        })
    }
}

exports.createSection = async (req, res) => {
    try {
        const { title, description } = req.body
        if (!title?.trim() || !description?.trim()) return res.status(400).json({
            success: false,
            message: "Title and description are required"
        })
        const section = await sectionModel.create({
            title,
            description,
            author: req.userId
        })
        return res.status(201).json({
            success: true,
            message: "Section created successfully",
            payload: section
        })
    } catch (error) {
        console.error("Error creating Section:", error.message)
        return res.status(500).json({
            success: false,
            message: "Error creating Section"
        })
    }
}

exports.updateSectionById = async (req, res) => {
    try {
        const { title, description } = req.body
        if (!title?.trim() || !description?.trim()) return res.status(400).json({
            success: false,
            message: "Title and description are required"
        })
        const { id } = req.params
        const section = await sectionModel.findByIdAndUpdate(id,
            { title, description },
            { new: true, runValidators: true }
        ).lean()

        if (!section) return res.status(404).json({
            success: false,
            message: "Section not found"
        })

        return res.status(200).json({
            success: true,
            message: "Section updated successfully",
            payload: section
        })
    } catch (error) {
        console.error("Error updating section:", error.message)
        return res.status(500).json({
            success: false,
            message: "Error updating section by id"
        })
    }
}

exports.deleteSectionById = async (req, res) => {
    try {
        const { id } = req.params
        const deletedSection = await sectionModel.findByIdAndDelete(id)
        if (!deletedSection) {
            return res.status(404).json({
                success: false,
                message: "Section not found"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Section deleted successfully"
        })
    } catch (error) {
        console.error("Error deleting section:", error.message)
        return res.status(500).json({
            success: false,
            message: "Error deleting section by id"
        })
    }
}