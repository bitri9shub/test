const express = require("express")
const { getSubSections,
    getSubSectionById,
    createSubSection,
    updateSubSectionById,
    deleteSubSectionById
} = require("../controllers/subsection.controller")
const { requireAuth } = require("../middlewares/auth.middleware")

const router = express.Router()

/**
 * @openapi
 * tags:
 *  name: Sub-sections
 *  description: Gestion des sous sections
 */

/**
 * @openapi
 * /subsections:
 *   get:
 *     summary: Récupérer toutes les sous-sections
 *     tags:
 *       - Sub-sections
 *     responses:
 *       200:
 *         description: Liste des sous-sections récupérée avec succès
 *       500:
 *         description: Erreur serveur
 */
router.get("/", getSubSections)

/**
 * @openapi
 * /subsections/{id}:
 *   get:
 *     summary: Récupérer une sous-section par ID
 *     tags:
 *       - Sub-sections
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la sous-section
 *     responses:
 *       200:
 *         description: Sous-section trouvée
 *       404:
 *         description: Sous-section non trouvée
 *       500:
 *         description: Erreur serveur
 */
router.get("/:id", getSubSectionById)

/**
 * @openapi
 * /subsections:
 *   post:
 *     summary: Créer une nouvelle sous-section
 *     tags:
 *       - Sub-sections
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
 *         description: Sous-section créée avec succès
 *       400:
 *         description: Données invalides
 *       500:
 *         description: Erreur serveur
 */
router.post("/", requireAuth, createSubSection)

/**
 * @openapi
 * /subsections/{id}:
 *   patch:
 *     summary: Mettre à jour une sous-section
 *     tags:
 *       - Sub-sections
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la sous-section
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
 *         description: Sous-section mise à jour avec succès
 *       400:
 *         description: Données invalides
 *       404:
 *         description: Sous-section non trouvée
 *       500:
 *         description: Erreur serveur
 */
router.patch("/:id", requireAuth, updateSubSectionById)

/**
 * @openapi
 * /subsections/{id}:
 *   delete:
 *     summary: Supprimer une sous-section
 *     tags:
 *       - Sub-sections
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la sous-section
 *     responses:
 *       200:
 *         description: Sous-section supprimée avec succès
 *       404:
 *         description: Sous-section non trouvée
 *       500:
 *         description: Erreur serveur
 */
router.delete("/:id", requireAuth, deleteSubSectionById)

module.exports = router