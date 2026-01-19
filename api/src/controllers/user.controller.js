const { userModel } = require("../models/user.model")

exports.getUsers = async (req, res) => {
    try {
        const users = await userModel.find().select('-password').lean()
        return res.status(200).json({
            success: true,
            payload: users,
            count: users.length
        })
    } catch (error) {
        console.error("Error getting users: ", error.message)
        return res.status(500).json({
            success: false,
            message: "Error getting users"
        })
    }
}

exports.getUserById = async (req, res) => {
    try {
        const { id } = req.params
        const user = await userModel.findById(id).select('-password').lean()
        if (!user) return res.status(404).json({
            success: false,
            message: "User not found"
        })
        return res.status(200).json({
            success: true,
            payload: user
        })
    } catch (error) {
        console.error("Error getting user: ", error.message)
        return res.status(500).json({
            success: false,
            message: "Error getting user by id"
        })
    }
}

exports.createUser = async (req, res) => {
    try {
        const { email, username, password } = req.body
        if (!email?.trim() || !username?.trim() || !password) return res.status(400).json({
            success: false,
            message: "Email, username and password are required"
        })
        const user = await userModel.create({ email, username, password })
        return res.status(201).json({
            success: true,
            message: "User created successfully",
            payload: user
        })
    } catch (error) {
        console.error("Error creating user:", error.message)
        return res.status(500).json({
            success: false,
            message: "Error creating user"
        })
    }
}

exports.updateUserById = async (req, res) => {
    try {
        const { email, username } = req.body
        if (!email?.trim() || !username?.trim()) return res.status(400).json({
            success: false,
            message: "Email and username are required"
        })
        const { id } = req.params
        const user = await userModel.findByIdAndUpdate(id,
            { email, username },
            { new: true, runValidators: true }
        ).lean()

        if (!user) return res.status(404).json({
            success: false,
            message: "User not found"
        })

        return res.status(200).json({
            success: true,
            message: "User updated successfully",
            payload: user
        })
    } catch (error) {
        console.error("Error updating user:", error.message)
        return res.status(500).json({
            success: false,
            message: "Error updating user by id"
        })
    }
}

exports.deleteUserById = async (req, res) => {
    try {
        const { id } = req.params
        const deletedUser = await userModel.findByIdAndDelete(id)
        if (!deletedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }
        return res.status(200).json({
            success: true,
            message: "User deleted successfully"
        })
    } catch (error) {
        console.error("Error deleting user:", error.message)
        return res.status(500).json({
            success: false,
            message: "Error deleting user by id"
        })
    }
}