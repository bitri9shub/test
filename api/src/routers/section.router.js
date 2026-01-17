const express = require("express")
const {
    getSections,
    getSectionById,
    createSection,
    updateSectionById,
    deleteSectionById
} = require("../controllers/section.controller")

const router = express.Router()

router.get("/", getSections)
router.get("/:id", getSectionById)
router.post("/", createSection)
router.patch("/:id", updateSectionById)
router.delete("/:id", deleteSectionById)

module.exports = router