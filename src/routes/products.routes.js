const express = require('express');
const controller = require('../controllers/products.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/', controller.list);
router.get('/:id', controller.getById);
router.post('/', authMiddleware, controller.create);
router.put('/:id', authMiddleware, controller.replace);
router.patch('/:id', authMiddleware, controller.update);
router.delete('/:id', authMiddleware, controller.remove);

module.exports = router;
