const express = require('express')
const {
    login,
    logout,
    profile
} = require('../controllers/auth.controller')
const {
    requireAuth
} = require('../middlewares/auth.middleware')

const router = express.Router()

router.post('/login', login)
router.post('/logout', logout)
router.get('/profile', requireAuth, profile)

module.exports = router