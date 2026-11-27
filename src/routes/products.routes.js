const express = require('express');
const controller = require('../controllers/products.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const requireRole = require('../middlewares/role.middleware');
const validate = require('../middlewares/validate.middleware');
const { createProductSchema, updateProductSchema } = require('../validator/products.validator');

const router = express.Router();

router.use(authMiddleware);

router.get('/', requireRole('client', 'manager', 'admin'), controller.list);
router.get('/:id', requireRole('client', 'manager', 'admin'), controller.getById);
router.post('/', requireRole('manager', 'admin'), validate(createProductSchema), controller.create);
// Pour un manager, la propriété du produit est vérifiée dans le contrôleur
router.put('/:id', requireRole('manager', 'admin'), validate(updateProductSchema), controller.replace);
router.patch('/:id', requireRole('manager', 'admin'), validate(updateProductSchema), controller.update);
router.delete('/:id', requireRole('admin'), controller.remove);

module.exports = router;
