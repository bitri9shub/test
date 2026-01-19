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

/**
 * @openapi
 * tags:
 *  name: Courses
 *  description: Gestion des cours
 */

/**
 * @openapi
 * /courses:
 *   get:
 *     summary: Récupérer tous les cours
 *     tags:
 *       - Courses
 *     responses:
 *       200:
 *         description: Liste des cours récupérée avec succès
 *       500:
 *         description: Erreur serveur
 */
router.get("/", getCourses)

/**
 * @openapi
 * /courses/{id}:
 *   get:
 *     summary: Récupérer un cours par ID
 *     tags:
 *       - Courses
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du cours
 *     responses:
 *       200:
 *         description: Cours trouvé
 *       404:
 *         description: Cours non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.get("/:id", getCourseById)

/**
 * @openapi
 * /courses:
 *   post:
 *     summary: Créer un nouveau cours
 *     tags:
 *       - Courses
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - themes
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               themes:
 *                 type: string
 *     responses:
 *       201:
 *         description: Cours créé avec succès
 *       400:
 *         description: Données invalides
 *       401:
 *         description: Non autorisé
 *       500:
 *         description: Erreur serveur
 */
router.post("/", requireAuth, createCourse)

/**
 * @openapi
 * /courses/{id}:
 *   patch:
 *     summary: Mettre à jour un cours
 *     tags:
 *       - Courses
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du cours
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - themes
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               themes:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cours mis à jour avec succès
 *       400:
 *         description: Données invalides
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Cours non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.patch("/:id", requireAuth, updateCourseById)

/**
 * @openapi
 * /courses/{id}:
 *   delete:
 *     summary: Supprimer un cours
 *     tags:
 *       - Courses
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du cours
 *     responses:
 *       200:
 *         description: Cours supprimé avec succès
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Cours non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.delete("/:id", requireAuth, deleteCourseById)

module.exports = router