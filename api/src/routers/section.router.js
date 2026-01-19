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

/**
 * @openapi
 * tags:
 *  name: Sections
 *  description: Gestion des sections
 */

/**
 * @openapi
 * /sections:
 *   get:
 *     summary: Récupérer toutes les sections
 *     tags:
 *       - Sections
 *     responses:
 *       200:
 *         description: Liste des sections récupérée avec succès
 *       500:
 *         description: Erreur serveur
 */
router.get("/", getSections)

/**
 * @openapi
 * /sections/{id}:
 *   get:
 *     summary: Récupérer une section par ID
 *     tags:
 *       - Sections
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la section
 *     responses:
 *       200:
 *         description: Section trouvée
 *       404:
 *         description: Section non trouvée
 *       500:
 *         description: Erreur serveur
 */
router.get("/:id", getSectionById)

/**
 * @openapi
 * /sections:
 *   post:
 *     summary: Créer une nouvelle section
 *     tags:
 *       - Sections
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
 *         description: Section créée avec succès
 *       400:
 *         description: Données invalides
 *       401:
 *         description: Non autorisé
 *       500:
 *         description: Erreur serveur
 */
router.post("/", requireAuth, createSection)

/**
 * @openapi
 * /sections/{id}:
 *   patch:
 *     summary: Mettre à jour une section
 *     tags:
 *       - Sections
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la section
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
 *         description: Section mise à jour avec succès
 *       400:
 *         description: Données invalides
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Section non trouvée
 *       500:
 *         description: Erreur serveur
 */
router.patch("/:id", requireAuth, updateSectionById)

/**
 * @openapi
 * /sections/{id}:
 *   delete:
 *     summary: Supprimer une section
 *     tags:
 *       - Sections
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la section
 *     responses:
 *       200:
 *         description: Section supprimée avec succès
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Section non trouvée
 *       500:
 *         description: Erreur serveur
 */
router.delete("/:id", requireAuth, deleteSectionById)

module.exports = router