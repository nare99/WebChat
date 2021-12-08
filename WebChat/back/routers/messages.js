const express = require('express');
const router = express.Router();
const { authenticate } = require('../services/auth');


/**
 * @swagger
 * components:
 *   schemas:
 *     Messages:
 *       type: object
 *       required:
 *         - sender_id
 *         - receiver_id
 *         - message
 *       properties:
 *         id:
 *           type: integer
 *           description: The id of the message
 *         sender_id:
 *           type: integer
 *           description: The id of the sender
 *         receiver_id:
 *           type: integer
 *           description: The id of the receiver
 *         message:
 *           type: string
 *           description: The message
 *       example:
 *         id: 12
 *         sender_id: 1
 *         receiver_id: 2
 *         message: Hello
 */

/**
 * @swagger
 * tags:
 *   name: Messages
 *   description: The messages managing API
 */

/**
 * @swagger
 * /messages:
 *   post:
 *     security:
 *       - cookieAuth: [access_token]
 *     summary: Create a new message
 *     tags: [Messages]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Messages'
 *     responses:
 *       200:
 *         description: The message was successfully sent
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Messages'
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /messages:
 *    get:
 *      security:
 *        - cookieAuth: [access_token]
 *      summary: Return the list of all messages
 *      tags: [Messages]
 *      responses:
 *        200:
 *          description: the list of the messages
 *        401:
 *          description: Unauthorized
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Messages'
 */

/**
 * @swagger
 * /messages/{id}:
 *   get:
 *     security:
 *       - cookieAuth: [access_token]
 *     summary: Get the user by id
 *     tags: [Messages]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The message id
 *     responses:
 *       200:
 *         description: The message description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Messages'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: There are no such a Message
 */


/**
 * @swagger
 * /messages/{id1}/{id2}:
 *   get:
 *     security:
 *       - cookieAuth: [access_token]
 *     summary: Get the conversation
 *     tags: [Messages]
 *     parameters:
 *       - in: path
 *         name: id1
 *         schema:
 *           type: string
 *         required: true
 *         description: The message1 id
 *       - in: path
 *         name: id2
 *         schema:
 *           type: string
 *         required: true
 *         description: The message2 id
 *     responses:
 *       200:
 *         description: The message description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Messages'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: There are no such a Message
 */

/**
 * @swagger
 * /messages/{id}:
 *   put:
 *     security:
 *       - cookieAuth: [access_token]
 *     summary: Get the conversation
 *     tags: [Messages]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Messages'
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The message id
 *     responses:
 *       200:
 *         description: The message edited successfully
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Messages'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: There are no such a Message
 */

/**
 * @swagger
 * /messages/{id}:
 *   delete:
 *     security:
 *       - cookieAuth: [access_token]
 *     summary: Get the conversation
 *     tags: [Messages]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The message id
 *     responses:
 *       200:
 *         description: The message deleted successfully
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Messages'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: There are no such a Message
 */

const {
    getMessage,
    getMessages,
    getConversation,
    addMessage,
    editMessage,
    deleteMessage,
} = require('../controllers/messages');

router.get('/:id', authenticate, getMessage);
router.get('/:id1/:id2', authenticate, getConversation);

// router.get('/', getMessages);
router.get('/', authenticate, getMessages);
router.post('/', authenticate, addMessage);
// router.post('/', addMessage);
router.put('/:id', authenticate, editMessage);
router.delete('/:id', authenticate, deleteMessage);

module.exports = router;