const express = require('express');
const router = express.Router();

// Import preguntasController (handles pregunta endpoints)
const preguntasController = require('../controllers/index');

// Import ensayoRoutes (entire subrouter)
const ensayoRoutes = require('./ensayoRoutes');

//=========== Pregunta endpoints ===========//

router.get('/preguntas', preguntasController.getPreguntas);
router.post('/preguntas', preguntasController.addPregunta);

//=========== Ensayo endpoints ===========//

router.use('/ensayos', ensayoRoutes); // Mount all ensayo routes under /ensayos

module.exports = router;