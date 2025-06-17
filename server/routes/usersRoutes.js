const express = require('express');
const { getAllUsers, createUser, updateUser, removeUser, manageLogin, manageLogout,getCurrentUser, googleAuth  } = require('../controllers/usersController');
const { validateSignup, validateLogin,verifyToken } = require('../helpers/middelware');
const rolesRoutes = require('./usersRolesRoutes');
const cartRoutes = require('./cartRoutes');
const router = express.Router();
router.use('/cart', cartRoutes); 
router.use('/roles', rolesRoutes)
router.get('/', getAllUsers);
router.get('/currentUser', getCurrentUser); 
router.post('/', validateSignup, createUser);
router.post('/login', validateLogin, manageLogin);
router.post('/logout', manageLogout);
router.put('/', verifyToken,updateUser);
router.delete('/:id', removeUser);
router.post('/google',googleAuth );


module.exports = router;