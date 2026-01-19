const jwt = require("jsonwebtoken")
const { userModel } = require("../models/user.model")

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body
        if (!username?.trim() || !password) {
            return res.status(400).json({
                success: false,
                message: 'Username and password are required'
            })
        }
        const user = await userModel.findOne({ username })
        if (!user) return res.status(401).json({
            success: false,
            message: 'Invalid credentials'
        })
        const auth = await user.comparePassword(password)
        if (!auth) return res.status(401).json({
            success: false,
            message: 'Invalid credentials'
        })
        // Générer un JWT token
        const token = jwt.sign(
            { userId: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        )

        // Création du cookie
        res.cookie("Bearer", token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            // secure: process.env.NODE_ENV === 'production', // HTTPS uniquement en prod
            sameSite: 'strict' // Protection CSRF
        })

        // Retourner user sans password
        const userWithoutPassword = user.toObject()
        delete userWithoutPassword.password
        return res.status(200).json({
            success: true,
            payload: userWithoutPassword
        })

    } catch (error) {
        console.error("Error during login: ", error.message)
        return res.status(500).json({
            success: false,
            message: "Error during login"
        })
    }
}

exports.logout = async (req, res) => {
    res.clearCookie("Bearer", {
        httpOnly: true,
        sameSite: 'strict'
    })
    return res.status(200).json({
        success: true,
        message: "Logged out successfully"
    })
}

exports.profile = async (req, res) => {
    try {
        const user = await userModel.findById(req.userId).select('-password').lean()

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            })
        }

        return res.status(200).json({
            success: true,
            payload: user
        })
    } catch (error) {
        console.error("Error getting profile: ", error.message)
        return res.status(500).json({
            success: false,
            message: "Error getting profile"
        })
    }
}