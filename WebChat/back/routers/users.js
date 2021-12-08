
const express = require('express');
const router = express.Router();
const { authenticate } = require('../services/auth');
/**
 * @swagger
 * components:
 *   schemas:
 *     Users:
 *       type: object
 *       required:
 *         - name
 *         - surname
 *         - email
 *         - hashedPassword
 *       properties:
 *         id:
 *           type: integer
 *           description: The id of the user
 *         name:
 *           type: string
 *           description: The name of the user
 *         surname:
 *           type: string
 *           description: The surname of the user
 *         email:
 *           type: string
 *           description: The email of the user
 *         hashedPassword:
 *           type: string
 *           description: The hashedPassword of the user
 *       example:
 *         id: 15
 *         name: Nare
 *         surname: Mkrtchyan
 *         email: nare@gmail.com
 *         password: asd123
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The users managing API
 */
/**
 * @swagger
 * /users/signup:
 *   post:
 *     security: []
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Users'
 *     responses:
 *       404:
 *         description: Invalid password field
 *       401:
 *         description: Email address already exists
 *       200:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Users'
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /users/signin:
 *   post:
 *     security: []
 *     summary: Sign In
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Users'
 *     responses:
 *       200:
 *         description: >
 *           Successfully authenticated.
 *           The session ID is returned in a cookie named `access_token`. You need to include this cookie in subsequent requests.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Users'
 *         headers: 
 *           Set-Cookie:
 *             schema: 
 *               type: string
 *               example: access_token=abcde12345; Path=/; HttpOnly      
 *       500:
 *         description: Some server error
 *       404:
 *         description: User not found
 *       401:
 *         description: Unauthorized
 * 
 */
/**
 * @swagger
 * /users:
 *    get:
 *      security:
 *        - cookieAuth: [access_token]
 *      summary: Return the list of all users
 *      tags: [Users]
 *      responses:
 *        200:
 *          description: the list of the users
 *        401:
 *          description: Unauthorized
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Users'
 */

const {
    getUser,
    getUsers,
    signUp,
    signIn,
    editUser
} = require('../controllers/users');





router.get('/:id', authenticate, getUser);
router.get('/', authenticate, getUsers);
router.put('/:id', authenticate, editUser);
router.post('/signup', signUp);
router.post('/signin', signIn);

module.exports = router;