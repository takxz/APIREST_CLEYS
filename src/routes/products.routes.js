const express = require('express');
const controller = require('../controllers/products.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const requireRole = require('../middlewares/role.middleware');

const router = express.Router();

router.use(authMiddleware);

router.get('/', requireRole('client', 'manager', 'admin'), controller.list);
router.get('/:id', requireRole('client', 'manager', 'admin'), controller.getById);
router.post('/', requireRole('manager', 'admin'), controller.create);
// Pour un manager, la propriété du produit est vérifiée dans le contrôleur
router.put('/:id', requireRole('manager', 'admin'), controller.replace);
router.patch('/:id', requireRole('manager', 'admin'), controller.update);
router.delete('/:id', requireRole('admin'), controller.remove);

module.exports = router;
