const express = require("express")
const {
    getCourses,
    getCourseById,
    createCourse,
    updateCourseById,
    deleteCourseById
} = require("../controllers/course.controller")
const { requireAuth } = require("../middlewares/auth.middleware")

const router = express.Router()

router.get("/", getCourses)
router.get("/:id", getCourseById)
router.post("/", requireAuth, createCourse)
router.patch("/:id", requireAuth, updateCourseById)
router.delete("/:id", requireAuth, deleteCourseById)

module.exports = router