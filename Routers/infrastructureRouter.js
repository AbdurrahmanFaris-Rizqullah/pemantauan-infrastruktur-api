const express = require('express');
const router = express.Router();
const infrastructureController = require('../controllers/infrastructureController');

router.post('/infrastructure', infrastructureController.createInfrastructure);
router.get('/infrastructure', infrastructureController.getAllInfrastructure);
router.get('/infrastructure/search', infrastructureController.searchInfrastructureByName);
router.put('/infrastructure/:name', infrastructureController.updateInfrastructureByName);
router.delete('/infrastructure/:name', infrastructureController.deleteInfrastructureByName);

module.exports = router;
