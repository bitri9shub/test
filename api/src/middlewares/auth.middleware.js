exports.requireAuth = async (req, res, next) => {
    try {
        // Récupérer le token depuis le cookie
        const token = req.cookies.Bearer

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Authentication required'
            })
        }

        // Vérifier le token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        // Ajouter les infos user à la requête
        req.userId = decoded.userId
        req.username = decoded.username

        next() // Passer au controller suivant
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                message: 'Invalid token'
            })
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: 'Token expired'
            })
        }
        return res.status(500).json({
            success: false,
            message: 'Authentication error'
        })
    }
}