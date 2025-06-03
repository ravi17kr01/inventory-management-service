const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const  { createItem, getItemById, updateItem, deleteItem } = require('../controllers/itemController'); 

/**
 * @swagger
 * tags:
 *   name: Inventory Management
 */
router.use(authMiddleware)
//create item route
router.post('/', createItem);

//get item by id route
router.get('/',  getItemById);

//update item route
router.put('/:id', updateItem);

//delete item route
router.delete('/:id', deleteItem);

/**
 * @swagger
 * /api/items:
 *   post:
 *     summary: Create a new inventory item
 *     tags: [Inventory Management]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - quantity
 *             properties:
 *               name:
 *                 type: string
 *               quantity:
 *                 type: number
 *     responses:
 *       201:
 *         description: Item created
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * /api/items:
 *   get:
 *     summary: Get all items for the logged-in user
 *     tags: [Inventory Management]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of items
 */

/**
 * @swagger
 * /api/items/{id}:
 *   put:
 *     summary: Update an item
 *     tags: [Inventory Management]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Item ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               quantity:
 *                 type: number
 *     responses:
 *       200:
 *         description: Item updated
 *       404:
 *         description: Item not found
 */

/**
 * @swagger
 * /api/items/{id}:
 *   delete:
 *     summary: Delete an item
 *     tags: [Inventory Management]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Item ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Item deleted
 *       404:
 *         description: Item not found
 */

module.exports = router;