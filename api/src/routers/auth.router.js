const express = require('express')
const {
    login,
    logout,
    profile
} = require('../controllers/auth.controller')
const {
    requireAuth
} = require('../middlewares/auth.middleware')

const router = express.Router()

/**
 * @openapi
 * tags:
 *  name: Authentication et Authorisation
 *  description: Gestion de l'authentication et l'autorisation
 */

/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: Authentifier un utilisateur
 *     tags:
 *       - Authentication et Authorisation
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Authentification réussie (JWT stocké dans un cookie)
 *       400:
 *         description: Données manquantes
 *       401:
 *         description: Identifiants invalides
 *       500:
 *         description: Erreur serveur
 */
router.post('/login', login)

/**
 * @openapi
 * /auth/logout:
 *   post:
 *     summary: Déconnecter l'utilisateur
 *     tags:
 *       - Authentication et Authorisation
 *     responses:
 *       200:
 *         description: Déconnexion réussie
 */
router.post('/logout', logout)

/**
 * @openapi
 * /auth/profile:
 *   get:
 *     summary: Récupérer le profil de l'utilisateur connecté
 *     tags:
 *       - Authentication et Authorisation
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profil utilisateur récupéré avec succès
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur serveur
 */

router.get('/profile', requireAuth, profile)

module.exports = router