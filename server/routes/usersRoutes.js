const express = require('express');
const { getAllUsers, getUserById, createUser, updateUser, removeUser, manageLogin, manageLogout,getCurrentUser } = require('../controllers/usersController');
const { validateSignup, validateLogin } = require('../helpers/validations');
const cartController = require('./cartRoutes');
const router = express.Router();
router.use('/:userId/cart', cartController); // Mounting favorites routes under /favorites
router.get('/', getAllUsers);
router.get('/me', getCurrentUser); // New endpoint to get current user from token
router.get('/:id', getUserById);
router.post('/', validateSignup, createUser);
router.post('/login', validateLogin, manageLogin);
router.post('/logout', manageLogout);
router.put('/:id', updateUser);
router.delete('/:id', removeUser);


module.exports = router;