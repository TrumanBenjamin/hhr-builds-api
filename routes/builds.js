/**
 * @swagger
 * /api/builds:
 *   get:
 *     summary: List all builds
 *     responses:
 *       200:
 *         description: Array of builds
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Build'
 *   post:
 *     summary: Create a build
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewBuild'
 *     responses:
 *       201:
 *         description: Created
 *
 * /api/builds/{id}:
 *   get:
 *     summary: Get a build by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: OK }
 *       404: { description: Not found }
 *   put:
 *     summary: Update a build
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Build'
 *     responses:
 *       200: { description: Updated }
 *   delete:
 *     summary: Delete a build
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       204: { description: Deleted }
 */

const router = require('express').Router();
const c = require('../controllers/buildsController');

// CRUD
router.get('/', c.listBuilds);
router.get('/:id', c.getBuild);
router.post('/', c.createBuild);
router.put('/:id', c.updateBuild);
router.delete('/:id', c.deleteBuild);

module.exports = router;