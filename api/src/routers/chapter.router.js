const express = require("express")
const {
    getChapters,
    getChapterById,
    createChapter,
    updateChapterById,
    deleteChapterById
} = require("../controllers/chapter.controller")
const { requireAuth } = require("../middlewares/auth.middleware")

const router = express.Router()

router.get("/", getChapters)
router.get("/:id", getChapterById)
router.post("/", requireAuth, createChapter)
router.patch("/:id", requireAuth, updateChapterById)
router.delete("/:id", requireAuth, deleteChapterById)

module.exports = router