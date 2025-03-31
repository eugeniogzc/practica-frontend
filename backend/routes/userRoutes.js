const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middlewares/authMiddleware')
const userController = require('../controllers/userControllers');

router.get('/', authenticateToken, userController.getUsers);
router.post('/', userController.createUser);
router.put('/:Id', authenticateToken, userController.updateUser);
router.delete('/:Id', authenticateToken, userController.deleteUser);

module.exports = router;