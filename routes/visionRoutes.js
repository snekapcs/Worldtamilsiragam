const express = require('express');
const router = express.Router();
const visionController = require('../controllers/visionController');

router.post('/vision', visionController.createItem);
router.get('/vision', visionController.getAllItems);
router.get('/vision/:id', visionController.getItemById);
router.put('/vision/:id', visionController.updateItem);
router.delete('/vision/:id', visionController.deleteItem);

module.exports = router;