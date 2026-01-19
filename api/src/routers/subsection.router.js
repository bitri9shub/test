const express = require("express")
const { getSubSections, getSubSectionById, createSubSection, updateSubSectionById, deleteSubSectionById } = require("../controllers/subsection.controller")
const { requireAuth } = require("../middlewares/auth.middleware")

const router = express.Router()

router.get("/", getSubSections)
router.get("/:id", getSubSectionById)
router.post("/", requireAuth, createSubSection)
router.patch("/:id", requireAuth, updateSubSectionById)
router.delete("/:id", requireAuth, deleteSubSectionById)

module.exports = router