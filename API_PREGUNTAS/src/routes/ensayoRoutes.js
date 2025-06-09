// src/routes/ensayoRoutes.js
const express = require('express');
const router = express.Router();
const ensayoController = require('../controllers/ensayoController');

// Get all ensayos
router.get('/', ensayoController.getEnsayos);

// Create a new ensayo
router.post('/', ensayoController.addEnsayo);

// Link a pregunta to a specific ensayo
router.post('/:id/preguntas', ensayoController.addPreguntaToEnsayo);

// Get all preguntas for a specific ensayo
router.get('/:id/preguntas', ensayoController.getPreguntasByEnsayo);

module.exports = router;

