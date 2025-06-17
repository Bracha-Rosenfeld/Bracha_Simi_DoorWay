const express = require('express');
const { getAllUsers, getUserById, createUser, updateUser, removeUser, manageLogin, manageLogout,getCurrentUser, googleAuth  } = require('../controllers/usersController');
const { validateSignup, validateLogin } = require('../helpers/middelware');
const rolesRoutes = require('./usersRolesRoutes');
const cartRoutes = require('./cartRoutes');
const router = express.Router();
router.use('/cart', cartRoutes); // Mounting favorites routes under /favorites
router.use('/:userId/roles', rolesController)
router.get('/', getAllUsers);
router.get('/me', getCurrentUser); // New endpoint to get current user from token
router.get('/:id', getUserById);
router.post('/', validateSignup, createUser);
router.post('/login', validateLogin, manageLogin);
router.post('/logout', manageLogout);
router.put('/:id', updateUser);
router.delete('/:id', removeUser);
router.post('/google',googleAuth );


module.exports = router;