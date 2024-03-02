const express = require('express');
const router = express.Router();
const { requiresAuth } = require('express-openid-connect');

const actorsController = require('../controllers/actors');
const validation = require('../middleware/validate');

router.get('/', requiresAuth(), actorsController.getAllActors);
router.get('/:id', requiresAuth(), actorsController.getSingleActor);
router.post('/', requiresAuth(), validation.saveActor, actorsController.createActor);
router.put('/:id', requiresAuth(), validation.saveActor, actorsController.updateActor);
router.delete('/:id', requiresAuth(), actorsController.deleteActor);

module.exports = router;

