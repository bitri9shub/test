const { subSectionModel } = require("../models/subsection.model")

exports.getSubSections = async (req, res) => {
    try {
        const subsections = await subSectionModel.find().lean()
        return res.status(200).json({
            success: true,
            payload: subsections,
            count: subsections.length
        })
    } catch (error) {
        console.error("Error getting sub-section: ", error.message)
        return res.status(500).json({
            success: false,
            message: "Error getting sub-section"
        })
    }
}

exports.getSubSectionById = async (req, res) => {
    try {
        const { id } = req.params
        const subsection = await subSectionModel.findById(id).lean()
        if (!subsection) return res.status(404).json({
            success: false,
            message: "sub-section not found"
        })
        return res.status(200).json({
            success: true,
            subsection
        })
    } catch (error) {
        console.error("Error getting sub-section: ", error.message)
        return res.status(500).json({
            success: false,
            message: "Error getting sub-section by id"
        })
    }
}

exports.createSubSection = async (req, res) => {
    try {
        const { title, description } = req.body
        if (!title?.trim() || !description?.trim()) return res.status(400).json({
            success: false,
            message: "Title and description are required"
        })
        const subsection = await subSectionModel.create({
            title,
            description,
            author: req.userId
        })
        return res.status(201).json({
            success: true,
            message: "Sub-section created successfully",
            payload: subsection
        })
    } catch (error) {
        console.error("Error creating sub-section:", error.message)
        return res.status(500).json({
            success: false,
            message: "Error creating sub-section"
        })
    }
}

exports.updateSubSectionById = async (req, res) => {
    try {
        const { title, description } = req.body
        if (!title?.trim() || !description?.trim()) return res.status(400).json({
            success: false,
            message: "Title and description are required"
        })
        const { id } = req.params
        const subsection = await subSectionModel.findByIdAndUpdate(id,
            { title, description },
            { new: true, runValidators: true }
        ).lean()

        if (!subsection) return res.status(404).json({
            success: false,
            message: "Sub-section not found"
        })

        return res.status(200).json({
            success: true,
            message: "Sub-section updated successfully",
            payload: subsection
        })
    } catch (error) {
        console.error("Error updating subsection:", error.message)
        return res.status(500).json({
            success: false,
            message: "Error updating subsection by id"
        })
    }
}

exports.deleteSubSectionById = async (req, res) => {
    try {
        const { id } = req.params
        const deletedSubSection = await subSectionModel.findByIdAndDelete(id)
        if (!deletedSubSection) {
            return res.status(404).json({
                success: false,
                message: "Sub-section not found"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Sub-section deleted successfully"
        })
    } catch (error) {
        console.error("Error deleting sub-section:", error.message)
        return res.status(500).json({
            success: false,
            message: "Error deleting sub-section by id"
        })
    }
}