const express = require("express")
const {
    getSections,
    getSectionById,
    createSection,
    updateSectionById,
    deleteSectionById
} = require("../controllers/section.controller")
const { requireAuth } = require("../middlewares/auth.middleware")

const router = express.Router()

router.get("/", getSections)
router.get("/:id", getSectionById)
router.post("/", requireAuth, createSection)
router.patch("/:id", requireAuth, updateSectionById)
router.delete("/:id", requireAuth, deleteSectionById)

module.exports = router