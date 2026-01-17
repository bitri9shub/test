const express = require("express")
const {
    getChapters,
    getChapterById,
    createChapter,
    updateChapterById,
    deleteChapterById
} = require("../controllers/chapter.controller")

const router = express.Router()

router.get("/", getChapters)
router.get("/:id", getChapterById)
router.post("/", createChapter)
router.patch("/:id", updateChapterById)
router.delete("/:id", deleteChapterById)

module.exports = router