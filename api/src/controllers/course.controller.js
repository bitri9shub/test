const { courseModel } = require("../models/course.model")
const mongoose = require("mongoose")

exports.getCourses = async (req, res) => {
    try {
        const courses = await courseModel.find().lean()
        return res.status(200).json({
            success: true,
            payload: courses,
            count: courses.length
        })
    } catch (error) {
        console.error("Error getting courses: ", error.message)
        return res.status(500).json({
            success: false,
            message: "Error getting courses"
        })
    }
}

exports.getCourseById = async (req, res) => {
    try {
        const { id } = req.params
        const course = await courseModel.findById(id).lean()
        if (!course) return res.status(404).json({
            success: false,
            message: "course not found"
        })
        return res.status(200).json({
            success: true,
            payload: course
        })
    } catch (error) {
        console.error("Error getting course: ", error.message)
        return res.status(500).json({
            success: false,
            message: "Error getting course by id"
        })
    }
}

exports.createCourse = async (req, res) => {
    try {
        const { title, description, themes } = req.body
        if (!title || !description || !themes) return res.status(400).json({
            success: false,
            message: "Title, themes and description are required"
        })
        const course = await courseModel.create({
            title,
            description,
            chapters: [],
            author: new mongoose.Types.ObjectId(), // retrieve user id later, when auth is created
        })
        return res.status(201).json({
            success: true,
            message: "Course created successfuly",
            payload: course
        })
    } catch (error) {
        console.error("Error creating course:", error.message)
        return res.status(500).json({
            success: false,
            message: "Error creating course"
        })
    }
}

exports.updateCourseById = async (req, res) => {
    try {
        const { title, description, themes } = req.body
        if (!title || !description || !themes) return res.status(400).json({
            success: false,
            message: "Title, themes and description are required"
        })
        const { id } = req.params
        const course = await courseModel.findByIdAndUpdate(id,
            { title, description, themes },
            { new: true, runValidators: true }
        ).lean()

        if (!course) return res.status(404).json({
            success: false,
            message: "course not found"
        })

        return res.status(200).json({
            success: true,
            message: "Course updated successfully",
            payload: course
        })
    } catch (error) {
        console.error("Error updating course:", error.message)
        return res.status(500).json({
            success: false,
            message: "Error updating course by id"
        })
    }
}

exports.deleteCourseById = async (req, res) => {
    try {
        const { id } = req.params
        const deletedCourse = await courseModel.findByIdAndDelete(id)
        if (!deletedCourse) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Course deleted successfully"
        })
    } catch (error) {
        console.error("Error deleting course:", error.message)
        return res.status(500).json({
            success: false,
            message: "Error deleting course by id"
        })
    }
}