const express = require("express")
const {
    getUsers,
    getUserById,
    createUser,
    updateUserById,
    deleteUserById
} = require("../controllers/user.controller")

const router = express.Router()

/**
 * @openapi
 * tags:
 *  name: Users
 *  description: Gestion des utilisateurs
 */

/**
 * @openapi
 * /users:
 *   get:
 *     summary: Récupérer tous les utilisateurs
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Liste des utilisateurs récupérée
 *       500:
 *         description: Erreur serveur
 */
router.get('/', getUsers)

/**
 * @openapi
 * /users/{id}:
 *   get:
 *     summary: Obtenir un utilisateur par ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'utilisateur
 *     responses:
 *       200:
 *         description: Utilisateur trouvé
 *       404:
 *         description: Utilisateur non trouvé
 */
router.get('/:id', getUserById)

/**
 * @openapi
 * /users:
 *   post:
 *     summary: Créer un nouvel utilisateur
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - username
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Utilisateur créé
 *       400:
 *         description: Données invalides
 */
router.post('/', createUser)

/**
 * @openapi
 * /users/{id}:
 *   patch:
 *     summary: Mettre à jour un utilisateur
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               username:
 *                 type: string
 *     responses:
 *       200:
 *         description: Utilisateur mis à jour
 *       404:
 *         description: Utilisateur non trouvé
 */
router.patch('/:id', updateUserById)

/**
 * @openapi
 * /users/{id}:
 *   delete:
 *     summary: Supprimer un utilisateur
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Utilisateur supprimé
 *       404:
 *         description: Utilisateur non trouvé
 */
router.delete('/:id', deleteUserById)

module.exports = router