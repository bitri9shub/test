const express = require("express")
const { getUsers, getUserById, createUser, updateUserById, deleteUserById } = require("../controllers/user.controller")

const router = express.Router()

router.get('/', getUsers)
router.get('/:id', getUserById)
router.post('/', createUser)
router.patch('/:id', updateUserById)
router.delete('/:id', deleteUserById)

module.exports = router