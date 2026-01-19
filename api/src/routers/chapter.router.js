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

/**
 * @openapi
 * tags:
 *  name: Chapters
 *  description: Gestion des chapitres
 */

/**
 * @openapi
 * /chapters:
 *   get:
 *     summary: Récupérer tous les chapitres
 *     tags:
 *       - Chapters
 *     responses:
 *       200:
 *         description: Liste des chapitres récupérée avec succès
 *       500:
 *         description: Erreur serveur
 */
router.get("/", getChapters)

/**
 * @openapi
 * /chapters/{id}:
 *   get:
 *     summary: Récupérer un chapitre par ID
 *     tags:
 *       - Chapters
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du chapitre
 *     responses:
 *       200:
 *         description: Chapitre trouvé
 *       404:
 *         description: Chapitre non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.get("/:id", getChapterById)

/**
 * @openapi
 * /chapters:
 *   post:
 *     summary: Créer un nouveau chapitre
 *     tags:
 *       - Chapters
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
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Chapitre créé avec succès
 *       400:
 *         description: Données invalides
 *       401:
 *         description: Non autorisé
 *       500:
 *         description: Erreur serveur
 */
router.post("/", requireAuth, createChapter)

/**
 * @openapi
 * /chapters/{id}:
 *   patch:
 *     summary: Mettre à jour un chapitre
 *     tags:
 *       - Chapters
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du chapitre
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Chapitre mis à jour avec succès
 *       400:
 *         description: Données invalides
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Chapitre non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.patch("/:id", requireAuth, updateChapterById)

/**
 * @openapi
 * /chapters/{id}:
 *   delete:
 *     summary: Supprimer un chapitre
 *     tags:
 *       - Chapters
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du chapitre
 *     responses:
 *       200:
 *         description: Chapitre supprimé avec succès
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Chapitre non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.delete("/:id", requireAuth, deleteChapterById)

module.exports = router