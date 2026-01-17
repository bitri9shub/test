const express = require("express")
const {
    getCourses,
    getCourseById,
    createCourse,
    updateCourseById,
    deleteCourseById
} = require("../controllers/course.controller")

const router = express.Router()

router.get("/", getCourses)
router.get("/:id", getCourseById)
router.post("/", createCourse)
router.patch("/:id", updateCourseById)
router.delete("/:id", deleteCourseById)

module.exports = router