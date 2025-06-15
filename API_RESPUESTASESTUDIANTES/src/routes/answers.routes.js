const { Router } = require('express');
const ctrl = require('../controllers/answers.controller');
const router = Router();

router.get('/answers', ctrl.getAll);
router.get('/answers/student/:studentId', ctrl.getByStudent);
router.post('/answers', ctrl.create);
router.delete('/answers/:id', ctrl.remove);

module.exports = router; 