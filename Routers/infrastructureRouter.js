const express = require('express');
const infrastructureController = require('../controllers/infrastructureController');
const errorHandler = require('../middlewares/errorHandler'); // middleware error handler

const router = express.Router();


router.post('/infrastructure', infrastructureController.createInfrastructure); // Route untuk membuat infrastruktur baru
router.get('/infrastructure', infrastructureController.getAllInfrastructure);  // Route untuk mendapatkan semua infrastruktur
router.get('/infrastructure/search', infrastructureController.searchInfrastructureByName); // Route untuk mencari infrastruktur berdasarkan nama
router.put('/infrastructure/:name', infrastructureController.updateInfrastructureByName);// Route untuk update infrastruktur berdasarkan nama
router.post('/infrastructure/polygon', infrastructureController.getInfrastructureByPolygon);// Route untuk mendapatkan infrastruktur berdasarkan area poligon
router.delete('/infrastructure/:name', infrastructureController.deleteInfrastructureByName);// Route untuk menghapus infrastruktur berdasarkan nama
router.use(errorHandler);// Tambahkan middleware error handler di akhir router

module.exports = router;
