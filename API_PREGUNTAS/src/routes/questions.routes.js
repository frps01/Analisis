const { Router } = require('express');
const ctrl = require('../controllers/questions.controller');
const router = Router();

router.get('/questions', ctrl.getAll);
router.get('/questions/:id', ctrl.getOne);
router.post('/questions', ctrl.create);
router.put('/questions/:id', ctrl.update);
router.delete('/questions/:id', ctrl.remove);

module.exports = router;
