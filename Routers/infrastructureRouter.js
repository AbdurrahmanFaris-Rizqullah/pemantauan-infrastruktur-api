// routes/infrastructureRoutes.js

const express = require('express');
const router = express.Router();
const infrastructureController = require('../controllers/infrastructureController'); // Pastikan diimpor dengan benar

// Route untuk mendapatkan infrastruktur berdasarkan area poligon
router.post('/polygon', infrastructureController.getInfrastructureByPolygon);
router.post('/infrastructure', infrastructureController.createInfrastructure);
router.get('/infrastructure', infrastructureController.getAllInfrastructure);
router.get('/infrastructure/search', infrastructureController.searchInfrastructureByName);
router.put('/infrastructure/:name', infrastructureController.updateInfrastructureByName);
router.delete('/infrastructure/:name', infrastructureController.deleteInfrastructureByName);

module.exports = router;
